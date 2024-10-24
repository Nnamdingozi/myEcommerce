
// 'use client'


// import { useState, useEffect, useCallback } from 'react';
// import { NewCart } from '@/app/lib/definition';
// import { addItemsToCart, fetchUserCart, updateCartItem, deleteUserItem } from '@/app/lib/data';


// export const cartHookLogic = () => {


//   const [cart, setCart] = useState<NewCart[] | []>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [cartSubTotal, setCartSubTotal] = useState<number>(0);
//   const [count, setCount] = useState<number>(0)

//   const calculateCartSubTotal = (cart: NewCart[]) => {
//     return cart.reduce((sum, item) => {
//       const itemTot = parseFloat(item.total?.toString() || '0');
//       return sum + itemTot;
//     }, 0);
//   };


//   const addToCart = async (productId: number, quantity: number = 1) => {
// setLoading(true);
//     setCart((prev) => {
//       const existingIndex = prev.findIndex(
//         (item: NewCart) => item.productId === productId
//       );

//       if (existingIndex !== -1) {
//         console.log('item already exists in cart');
//         alert('Item already exists in cart');
//         return prev;
//       }
//       // setCount((prev) => prev + 1);
//       console.log('count after adding an item: ', count)
//       return [...prev, { productId, quantity } as NewCart];
//     });
//     try {
//       await addItemsToCart(productId, quantity);


//     } catch (err) {
//       console.error('failed to add item to cart', err)

//     }
//   };


//   const removeItemFromCart = async (cartItemId: number): Promise<void> => {
//     console.log('cartItemId in removeFromCart in hook for delete cart:', cartItemId)
//     try {

//       const deleted = await deleteUserItem(cartItemId);
//       if (deleted) {
//         setCart((prev) => {
//        const newCart =  prev.filter(item => item.id !== cartItemId);
//       //  setCount(newCart.length);
//        console.log('Item successfully deleted');
//        console.log('count after removing an item in hook:', count)
//         return newCart
//       })



//       } else {
//         console.error('Failed to delete item from server')
//       }


//     } catch (err) {
//       console.error("Failed to remove item from cart", err)

//     }
//   };



//   const getUserCart = useCallback(async () => {
//     console.log('fetching cart for user in hook;');
//     setLoading(true);
//     try {
//       const items = await fetchUserCart();
//       if (items) {
//         console.log(' cart items fetched for user in hook:', items)
//         setCart(items);
//         setCartSubTotal(calculateCartSubTotal(items));
//         // setCount(items.length)
//         console.log('cartTotal summary after getUserCart', cartSubTotal)
//      console.log('count after getuserCart in hook:', count)
//     }
//     } catch (err) {
//       setError('Failed to fetch cart items')
//       console.error('Failed to fetch cart items:', err)

//     } finally {
//       setLoading(false)
//     }

//   }, []);


//   useEffect(() => {
//     getUserCart();  // getUserCart is called inside useEffect, NOT during render
//   }, [getUserCart]);  



//   const newQuantity = async (cartItemId: number, newqty: number) => {
//     console.log('productId and quantity in newQuantity carthook:', cartItemId, newqty)
//     if (newqty < 1) return;
//     try {

//       const updatedItem: NewCart | undefined = await updateCartItem(cartItemId, newqty);

//       console.log('updatedItem: in hook', updatedItem)
//       if (updatedItem) {
//         setCart((prevCart) => {
//           const updatedCart =
//             prevCart.map((item) =>
//               item.id === updatedItem.id
//                 ? { ...item, quantity: updatedItem.quantity, total: updatedItem.total }
//                 : item
//             );
//           // setCartSubTotal(calculateCartSubTotal(updatedCart));
//           console.log('cartSubTotal summary after updating quantity:', cartSubTotal)

//           return updatedCart
//         });

//       }

//     } catch (err) {
//       console.error('Quantity update failed', err)
//     }
//   };
//   useEffect(() => {
//     const newSubTotal = calculateCartSubTotal(cart)
//     setCartSubTotal(newSubTotal);
//     setCount(cart.length)
//     console.log('cartSubTotal summary within useEffect', cartSubTotal);
//     console.log('count in carthook :', count)

//   }, [cart]);

//   return { cart, setCart, addToCart, loading, error, getUserCart, newQuantity, removeItemFromCart, cartSubTotal, count};

// }







import { addItemsToCart, fetchUserCart, updateCartItem, deleteUserItem } from '@/app/lib/data';
import { NewCart } from '@/app/lib/definition';


interface CartHookLogicProps {
  setCart: React.Dispatch<React.SetStateAction<NewCart[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  cart: NewCart[]

};




export const cartHookLogic = ({
  setCart,
  setLoading,
  setError,
  cart
}: CartHookLogicProps) => {


  const getUserCart = async () => {
    setLoading(true);
    try {
      const items: NewCart[] = await fetchUserCart() || [];
      if (items) {
        setCart(items);
      }
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1): Promise<NewCart | null> => {
    const existingIndex = cart.findIndex(item => item.productId === productId);
    if (existingIndex !== -1) {
      console.log('Item already exists in cart');
      alert('Item already exists in cart');
      return null;
    }
    try {
      const newItem: NewCart | undefined = await addItemsToCart(productId, quantity);
      if(!newItem) {
        throw new Error('Failed to create Item')
      }
      
      setCart(prev => [...prev, newItem]);
      return newItem
    } catch (err) {

      console.error('Failed to add item to cart', err);
      alert('Failed to add item to cart');
    }
    
return null
  };

  const removeItemFromCart = async (cartItemId: number) => {
    const deleted = await deleteUserItem(cartItemId);
    if (deleted) {
      setCart(prev => prev.filter(item => item.id !== cartItemId));
      console.log('Item successfully deleted');
    } else {
      console.error('Failed to delete item from server');
    }
  };

  const newQuantity = async (cartItemId: number, newqty: number) => {
    if (newqty < 1) return;
    const updatedItem = await updateCartItem(cartItemId, newqty);
    if (updatedItem) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === updatedItem.id
            ? { ...item, quantity: updatedItem.quantity, total: updatedItem.total }
            : item
        )
      );
    }
  };

  return { getUserCart, addToCart, removeItemFromCart, newQuantity };
};

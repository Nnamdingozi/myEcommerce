

import { addItemsToCart, fetchUserCart, updateCartItem, deleteUserItem } from '@/app/lib/data';
import { NewCart } from '@/app/lib/definition';


interface CartHookLogicProps {
  setCart: React.Dispatch<React.SetStateAction<NewCart[] | []>>;
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


 

  const getUserCart = async (token: string) => {
    setLoading(true);
    try {
      const items: NewCart[] = await fetchUserCart(token) || [];
      if (items) {
        setCart(items);
        return items
        
      }
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };





  const addToCart = async (token: string, productId: number, quantity: number = 1): Promise<NewCart | null> => {
    const existingIndex = cart.findIndex(item => item.productId === productId);
    if (existingIndex !== -1) {
      console.log('Item already exists in cart');
      alert('Item already exists in cart');
      return null;
    }
    try {
      const newItem: NewCart | undefined = await addItemsToCart(token, productId, quantity);
      // if(!newItem) {
      //   throw new Error('Failed to create Item')
      // }
      if(newItem) {
      setCart(prev => [...prev, newItem]);
      return newItem
      }
    } catch (err) {

      console.error('Failed to add item to cart', err);
      alert('Log in to Add Items to Cart');
    }
    
return null
  };

  const removeItemFromCart = async (token: string, cartItemId: number) => {
    const deleted = await deleteUserItem(token, cartItemId);
    if (deleted) {
      setCart(prev => prev.filter(item => item.id !== cartItemId));
      console.log('Item successfully deleted');
    } else {
      console.error('Failed to delete item from server');
    }
  };

  const newQuantity = async (token: string, cartItemId: number, newqty: number) => {
    if (newqty < 1) return;
    const updatedItem = await updateCartItem(token, cartItemId, newqty);
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

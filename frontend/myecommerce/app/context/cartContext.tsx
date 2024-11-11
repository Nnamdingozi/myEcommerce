// 'use client'

// import { createContext, useContext, useEffect, ReactNode, useState } from 'react';
// import { NewCart } from '@/app/lib/definition';
// import { cartHookLogic } from '@/app/lib/hooks/cartHooks';
// import { useUser } from '@/app/context/userContext';



// interface CartContextProps {
//   cart: NewCart[];
//   addToCart: (productId: number) => void;
//   loading: boolean;
//   error: string | null;
//   getUserCart: () => Promise<void>;
//   newQuantity: (id: number, newqty: number) => Promise<void>;
//   removeItemFromCart: (cartItemId: number) => Promise<void>;
//  cartSubTotal: number;
//  count: number;
 
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);
// interface CartProviderProps {
//   children: ReactNode;
//   initialCart?: NewCart[];  // Accept initial cart data
// }

// export const CartProvider = ({ children, initialCart }: CartProviderProps) => {
//   const { cart, addToCart, loading, error, getUserCart, setCart, newQuantity, removeItemFromCart, cartSubTotal, count } = cartHookLogic();
//   const { user } = useUser();
// console.log('count in cartprovider:', count)


//   useEffect(() => {
//     if (user.id) {

//       if (initialCart) {
//         setCart(initialCart);  // Set the initial cart if provided
//       } else {
//         getUserCart();
//       }
 
//     }
//   }, [initialCart, setCart, getUserCart, user.id]);

//   // useEffect(() => {
//   //   setCount(cart.length);
//   //   console.log('count in provider;', count)
//   // }, [cart]);

//   // const clearCount =()=> {
//   //   setCount(0)
//   // }
//   return (
//     <CartContext.Provider value={{ cart, addToCart, loading, error, getUserCart, newQuantity, removeItemFromCart, cartSubTotal, count }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('User must be within a CartProvider');
//   }
//   return context;
// };
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { NewCart } from '@/app/lib/definition';
import { cartHookLogic } from '@/app/lib/hooks/cartHooks';
import {useUser } from '@/app/context/userContext';



interface CartContextType  {
  cart: NewCart[];
  loading: boolean;
  error: string | null;
  cartSubTotal: number;
  count: number;
  addToCart: (productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
  removeItemFromCart: (cartItemId: number) => Promise<void>;
  newQuantity: (cartItemId: number, newqty: number) => Promise<void>;
  getUserCart: () => Promise<NewCart[] | undefined>;
  clearCart: () => void;
};

// interface CartProviderProps {
//   initialCart?: NewCart[];
//   children: React.ReactNode
  
// }

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  
  const [cart, setCart] = useState<NewCart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartSubTotal, setCartSubTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { getUserCart, addToCart, removeItemFromCart, newQuantity } = cartHookLogic({setCart, setLoading, setError, cart});
const {user } = useUser();



  useEffect(() => {
    const fetchUserCart = async (): Promise<NewCart[] | []> => {
        if (user) {
            setLoading(true);
            try {
                // Assuming fetchUserCart calls the backend API and retrieves cart
                const userCart = await getUserCart(); // Fetch cart for authenticated user
                if (userCart) {
                  setCart(userCart);

                  
                }
                
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        return []
    };

    fetchUserCart();
}, [user]); // Fetch cart whenever user changes





  // useEffect(() => {
  //   if(!initialCart) {
  //     getUserCart(); 
  //   }
    
  // }, [initialCart]);

//   useEffect(() => {
//     if(!initialCart) {
//      const userCart = async() => {
// const newCart = await  getUserCart(); 
// if(newCart ) {
//   setCart(newCart)
//  } 

// }
// userCart()
// }
    
//   }, [initialCart]);


// useEffect(() => {
//   const initializeCart = async () => {
//       try {
//           if (initialCart) {
//               setCart(initialCart);
//           } else {
//               const newCart = await getUserCart(); // fetches cart if no initialCart
//               setCart(newCart || []);
//           }
//       } catch (error) {
//           console.error("Error initializing cart:", error);
//       }
//   };

//   initializeCart(); // call the helper function
// }, [initialCart]); // only `initialCart` is a dependency, avoiding re-renders from getUserCart

  const calculateCartSubTotal = (cart: NewCart[]) => {
    return cart.reduce((sum, item) => {
      const itemTot = parseFloat(item.total?.toString() || '0');
      return sum + itemTot;
    }, 0);
  };

  const clearCart = () => {
    setCart([]); // This will trigger the `useEffect` and set count to 0
};


  useEffect(() => {
    setCartSubTotal(calculateCartSubTotal(cart));
    // setCount(cart.length);
    console.log('count value in cartContext useEffect:', count)
  }, [cart]);


  useEffect(() => {
    const countValue = async()=> {
      const fetchvalue = await getUserCart();
    if( user && cart && fetchvalue) {
      setCount(fetchvalue.length)
    }
    console.log('count value in cartContext useEffect:', count);
    countValue();
  }
  }, [cart, user])

 

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      cartSubTotal,
      count,
      addToCart,
      removeItemFromCart,
      newQuantity,
      getUserCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
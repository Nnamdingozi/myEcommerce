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
// 'use client'

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { NewCart } from '@/app/lib/definition';
// import { cartHookLogic } from '@/app/lib/hooks/cartHooks';
// import {useUser } from '@/app/context/userContext';



// interface CartContextType  {
//   cart: NewCart[];
//   loading: boolean;
//   error: string | null;
//   cartSubTotal: number;
//   count: number;
//   addToCart: (productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
//   removeItemFromCart: (cartItemId: number) => Promise<void>;
//   newQuantity: (cartItemId: number, newqty: number) => Promise<void>;
//   getUserCart: () => Promise<NewCart[] | undefined>;
//   clearCart: () => void;
// };

// // interface CartProviderProps {
// //   initialCart?: NewCart[];
// //   children: React.ReactNode
  
// // }

// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  
//   const [cart, setCart] = useState<NewCart[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [cartSubTotal, setCartSubTotal] = useState<number>(0);
//   const [count, setCount] = useState<number>(0);

//   const { getUserCart, addToCart, removeItemFromCart, newQuantity } = cartHookLogic({setCart, setLoading, setError, cart});
// const {user, saveToken } = useUser();



//   useEffect(() => {
//     const fetchUserCart = async (): Promise<NewCart[] | []> => {
//         if (user) {
//             setLoading(true);
//             try {
           
//                 const userCart = await getUserCart(); // Fetch cart for authenticated user
//                 if (userCart) {
//                   setCart(userCart);

                  
//                 }
                
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         return []
//     };

//     fetchUserCart();
// }, [user]); // Fetch cart whenever user changes



//   const calculateCartSubTotal = (cart: NewCart[]) => {
//     return cart.reduce((sum, item) => {
//       const itemTot = parseFloat(item.total?.toString() || '0');
//       return sum + itemTot;
//     }, 0);
//   };

//   const clearCart = () => {
//     setCart([]); // This will trigger the `useEffect` and set count to 0
// };


//   useEffect(() => {
//     setCartSubTotal(calculateCartSubTotal(cart));
//     // setCount(cart.length);
//     console.log('count value in cartContext useEffect:', count)
//   }, [cart]);


//   useEffect(() => {

//     if( user && cart ) {
//       setCount(cart.length)

//     console.log('count value in cartContext useEffect:', count);
//     }
//   }, [cart, user])

 

//   return (
//     <CartContext.Provider value={{
//       cart,
//       loading,
//       error,
//       cartSubTotal,
//       count,
//       addToCart,
//       removeItemFromCart,
//       newQuantity,
//       getUserCart,
//       clearCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use the CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };



'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { NewCart } from '@/app/lib/definition';
import { cartHookLogic } from '@/app/lib/hooks/cartHooks';
import { useUser } from '@/app/context/userContext';

interface CartContextType  {
  cart: NewCart[];
  loading: boolean;
  error: string | null;
  cartSubTotal: number;
  count: number;
  addToCart: ( token: string, productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
  removeItemFromCart: (token: string, cartItemId: number) => Promise<void>;
  newQuantity: (token: string, cartItemId: number, newqty: number) => Promise<void>;
  getUserCart: (token: string) => Promise<NewCart[] | undefined>;
  clearCart: () => void;
  setCart: React.Dispatch<React.SetStateAction<NewCart[]>>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<NewCart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartSubTotal, setCartSubTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { getUserCart, addToCart, removeItemFromCart, newQuantity } = cartHookLogic({ setCart, setLoading, setError});
  const { user, token } = useUser(); // Getting savedToken from useUser context
  
  useEffect(() => {
    const fetchUserCart = async (): Promise<NewCart[] | undefined> => {
      if (!token) {
        console.warn('No token provided. Skipping cart fetch.');
        setCart([]); // Clear cart if no user is logged in
        return;
      }
  
      setLoading(true);
      try {
        const userCart = await getUserCart(token); // Fetch cart from API
        setCart(userCart || []); // Set cart to fetched data or an empty array
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserCart();
  }, [token]); // Only fetch when token changes
  

  const calculateCartSubTotal = (cart: NewCart[]) => {
    return cart.reduce((sum, item) => {
      const itemTot = parseFloat(item.total?.toString() || '0');
      return sum + itemTot;
    }, 0);
  };

  const clearCart = () => {
    setCart([]); // Clear the cart, this will reset count to 0
  };

  useEffect(() => {
    setCartSubTotal(calculateCartSubTotal(cart));
  }, [cart]);

  useEffect(() => {
    if (token && user && cart) {
      setCount(cart.length);
    }
  }, [token, cart, user]);

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
      clearCart,
      setCart
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

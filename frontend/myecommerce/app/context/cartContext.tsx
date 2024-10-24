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
import { cartHookLogic } from '@/app/lib/hooks/cartHooks'; // Adjust the path as necessary



interface CartContextType  {
  cart: NewCart[];
  loading: boolean;
  error: string | null;
  cartSubTotal: number;
  count: number;
  addToCart: (productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
  removeItemFromCart: (cartItemId: number) => Promise<void>;
  newQuantity: (cartItemId: number, newqty: number) => Promise<void>;
  getUserCart: () => Promise<Ne>
  
};



const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cart, setCart] = useState<NewCart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartSubTotal, setCartSubTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const { getUserCart, addToCart, removeItemFromCart, newQuantity } = cartHookLogic({setCart, setLoading, setError, cart});

  useEffect(() => {
    getUserCart(); // Fetch user cart on mount
  }, []);

  const calculateCartSubTotal = (cart: NewCart[]) => {
    return cart.reduce((sum, item) => {
      const itemTot = parseFloat(item.total?.toString() || '0');
      return sum + itemTot;
    }, 0);
  };

  useEffect(() => {
    setCartSubTotal(calculateCartSubTotal(cart));
    setCount(cart.length);
    console.log('count value in cartContext useEffect:', count)
  }, [cart]);

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
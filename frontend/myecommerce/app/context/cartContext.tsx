

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
        console.error('Error fetching cart items:', err.response?.data || err.message || err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Only call fetchUserCart if the token exists (user is logged in)
    if (token) {
      fetchUserCart();
    }
  }, [token]); // Only trigger when the token changes or is available
  
  

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

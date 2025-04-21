'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { NewCart } from '@/app/lib/definition';
import { addItemsToCart, fetchUserCart, updateCartItem, deleteUserItem } from '@/app/lib/data/cart';
import { useUser } from '@/app/context/userContext';

interface CartContextType {
  cart: NewCart[];
  loading: boolean;
  error: string | null;
  cartSubTotal: number;
  count: number;
  fetchCartData: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<NewCart | null | undefined>;
  removeItemFromCart: (cartItemId: number) => Promise<void>;
  newQuantity: (cartItemId: number, newQty: number) => Promise<void>;
  clearCart: () => void;
  deleteMessage: string | null;
  setCart: React.Dispatch<React.SetStateAction<NewCart[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<NewCart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartSubTotal, setCartSubTotal] = useState<number>(0);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const { token } = useUser();

  const calculateCartSubTotal = useCallback(
    (cart: NewCart[]) => cart.reduce((sum, item) => sum + parseFloat(item.total?.toString() || '0'), 0),
    []
  );

  const fetchCartData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);
    try {
      const items: NewCart[] = await fetchUserCart(token) || [];
      setCart(items);
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addToCart = useCallback(
    async (productId: number, quantity: number = 1): Promise<NewCart | null> => {
      if (!token) {
        alert('Log in to Add Items to Cart');
        return null;
      }

      setLoading(true);
      setError(null);
      try {
        const newItem = await addItemsToCart(token, productId, quantity);
        if (!newItem) throw new Error('Failed to add item to cart');
        setCart((prevCart) => [...prevCart, newItem]);
        return newItem;
      } catch (err) {
        setError('Failed to add item to cart');
        console.error(err);
        alert('Failed to add item to cart');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const removeItemFromCart = useCallback(
    async (cartItemId: number): Promise<void> => {
      if (!token) return;

      setLoading(true);
      setError(null);
      try {
        const deleted = await deleteUserItem(token, cartItemId);
        if (deleted) {
          setDeleteMessage(deleted);
          setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
        } else {
          setError('Failed to delete item from cart');
        }
      } catch (err) {
        setError('Failed to remove item from cart');
        console.error(err);
        setDeleteMessage('Failed to delete cart item');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (deleteMessage !== null) {
      const timer = setTimeout(() => setDeleteMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  const newQuantity = useCallback(
    async (cartItemId: number, newQty: number): Promise<void> => {
      if (newQty < 1 || !token) return;

      setLoading(true);
      setError(null);
      try {
        const updatedItem = await updateCartItem(token, cartItemId, newQty);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: updatedItem?.quantity, total: updatedItem?.total }
              : item
          )
        );
      } catch (err) {
        setError('Failed to update item quantity');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    setCartSubTotal(calculateCartSubTotal(cart));
  }, [cart, calculateCartSubTotal]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        cartSubTotal,
        count: cart.length,
        fetchCartData,
        addToCart,
        removeItemFromCart,
        newQuantity,
        clearCart,
        deleteMessage,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { NewCart } from '@/app/lib/definition';
import { toast } from 'sonner';
import { useUser } from './userContext';
import { useRouter } from 'next/navigation';

// Import ALL functions from your new, refactored API service
import {
  upsertCartItem,
  fetchUserCart,
  updateCartItemQuantity,
  deleteCartItem
} from '@/app/lib/data/cart'; // Adjust path as needed


interface CartContextType {
  cart: NewCart[];
  isLoading: boolean;
  error: string | null;
  cartSubtotal: number;
  itemCount: number;
  fetchCart: () => Promise<void>;
  upsertToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, newQty: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<NewCart[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start true for initial fetch
  const [error, setError] = useState<string | null>(null);
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);

  const { user } = useUser();
  const router = useRouter();

  // --- Core Logic ---

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const items = await fetchUserCart();
      setCart(items);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cart items');
      toast.error('Could not load your cart.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial fetch w
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const upsertToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      if (!user) {
        toast.error('Please log in to add items to your cart.');
        router.push('/user/login');

      }

      setIsLoading(true);
      setError(null);
      try {
        const result = await upsertCartItem(productId, quantity);

        setCart((prevCart) => {
          const existingItemIndex = prevCart.findIndex(item => item.productId === productId);

          if (existingItemIndex > -1) {

            const newCart = [...prevCart];
            newCart[existingItemIndex] = result;
            return newCart;
          } else {

            return [...prevCart, result];
          }
        });

      } catch (err: any) {
        setError(err.message || 'Failed to add item to cart');
        // Re-throw the error so UI components can react (e.g., show a toast)
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const removeFromCart = useCallback(
    async (cartItemId: number) => {

      try {
        await deleteCartItem(cartItemId);
        // On success, filter the item out of the local state
        setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
      } catch (err: any) {
        setError(err.message || 'Failed to remove item from cart');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [user, deleteCartItem]
  );


  const updateQuantity = useCallback(
    async (itemId: number, newQty: number) => {
      if (!user) {
        toast.error('Please log in to modify your cart.');
        throw new Error('User not authenticated.');
      }

      if (newQty < 1) {
        return removeFromCart(itemId);
      }

      if (!user) {
        toast.error('Please log in to modify your cart.');
        throw new Error('User not authenticated.');
      }


      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQty } : item
        )
      );

      try {
        // Call the API service
        const updatedItem = await updateCartItemQuantity(itemId, newQty);

        setCart(prevCart =>
          prevCart.map((item) => (item.id === itemId ? updatedItem : item))
        );
      } catch (err: any) {
        toast.error(err.message || 'Failed to update quantity.');

        fetchCart();
      }
    },
    [user, removeFromCart, fetchCart]
  );




  // --- Derived State Calculations ---

  useEffect(() => {
    // Calculate subtotal whenever the cart changes
    const subtotal = cart.reduce((sum, item) => {
      // Safely calculate line item total. Assumes product price is included.
      const price = item.product?.price ? parseFloat(item.product.price.toString()) : 0;
      return sum + (price * item.quantity);
    }, 0);
    setCartSubtotal(subtotal);
  }, [cart]);


  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        cartSubtotal,
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0), // Total number of items
        fetchCart,
        upsertToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
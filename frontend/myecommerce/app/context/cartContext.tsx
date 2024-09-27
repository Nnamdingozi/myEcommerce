


'use client';

import { createContext, useState, useContext } from 'react';
import { NewCart } from '@/app/lib/definition';
import { addItemsToCart, fetchUserCart, updateCartItem } from '../lib/data';


interface CartContextProps {
  cart: NewCart[];
  addToCart: (productId: number, quantity: number) => void;
getUserCart: () => Promise<void>;
newQuantity: (id: number, newqty: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<NewCart[]>([]);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const newItem : NewCart | undefined = await addItemsToCart(productId, quantity);
      if (newItem) {
        console.log('newItem added to cart:', newItem);
        setCart((prev) => {
          const existingIndex = prev.findIndex(
            (item: NewCart) => item.productId === productId
          );

          if (existingIndex !== -1) {
            // Update the existing cart item
            const updatedItems: NewCart[] = [...prev];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex], // Preserve other properties
            quantity: (updatedItems[existingIndex].quantity || 0) + (newItem.quantity || 0),
          }
          
            return updatedItems; // Return a flat array of updated items
          }

          // If the item does not exist, add the new item to the cart
          return [...prev, newItem];
        });
      }
    } catch (err) {
      console.error('Failed to add item to cart:', err);
    }
  };

  const getUserCart = async() => {
    try{
        const items = await fetchUserCart();
        if(items) {
            setCart(items);
        }
    } catch(err){
        console.error('Failed to fetch cart items:', err)

    }
  }


  const newQuantity = async(id: number, newqty: number) => {
    try{
      const updateItem: NewCart | undefined = await updateCartItem(id, newqty);
      console.log('updatedItem: ', updateItem)
      if(updateItem) {
        setCart((prev)=> 
        prev.map((item) => 
        item.id === updateItem.id ? {...item, quantity: updateItem.quantity} : item
      )
    )
  }
      
    
    } catch(err) {
      console.error('Quantity update failed', err)
    }
    }

  return (
    <CartContext.Provider value={{ cart, addToCart, getUserCart, newQuantity }}>
      {children}
    </CartContext.Provider>
  );
};



export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('User must be within a CartProvider');
  }
  return context;
};

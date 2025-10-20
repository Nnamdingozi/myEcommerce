
// app/lib/data/cart.ts

import api from '../axiosApi'; 
import {NewCart} from '@/app/lib/definition'; 

/**
 * Adds an item to the cart or updates its quantity if it already exists.
 * Relies on the HttpOnly session cookie for authentication.
 * @param productId - The ID of the product.
 * @param quantity - The quantity to add.
 * @returns The newly created or updated cart item.
 */

export async function upsertCartItem(productId: number, quantity: number): Promise<NewCart> {
  try {
    
    const response = await api.post<NewCart>(
      '/cart',
      { productId, quantity }
    );
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to add item to cart.';
    throw new Error(errorMessage);
  }
}

/**
 * Fetches all items in the authenticated user's cart.
 * Relies on the HttpOnly session cookie for authentication.
 * @returns An array of cart items.
 */

export async function fetchUserCart(): Promise<NewCart[]> {
  try {
    
    const response = await api.get<NewCart[]>('/cart');
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to fetch cart items.';
    throw new Error(errorMessage);
  }
}

/**
 * Explicitly updates the quantity of a specific cart item by its unique ID.
 * Relies on the HttpOnly session cookie for authentication.
 * @param itemId - The unique ID of the cart item record (cart.id).
 * @param newQuantity - The new total quantity for the item.
 * @returns The updated cart item.
 */
// 2. REMOVE the `token` parameter
export async function updateCartItemQuantity(itemId: number, newQuantity: number): Promise<NewCart> {
  try {
    // 3. REMOVE `configWithToken`.
    const response = await api.put<NewCart>(
      `/cart/${itemId}`,
      { quantity: newQuantity }
    );
    return response.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to update cart item quantity.';
    throw new Error(errorMessage);
}
}

// app/lib/data/cart.ts


/**
 * Deletes a specific item from the user's cart.
 * @param itemId - The unique ID of the cart item record to delete.
 */
export async function deleteCartItem(itemId: number): Promise<void> {
  try {
    const response = await api.delete(`/cart/${itemId}`);
    

    if (response.status === 200) {
      // Success! The promise will resolve with `void`.
      return; 
    } else {
      // This is an unexpected case, but good to handle.
      throw new Error(`Server responded with status ${response.status}, but expected 200.`);
    }
  } catch (err: any) {
  
    const errorMessage = err.response?.data?.error || 'Failed to delete cart item.';
    throw new Error(errorMessage);
  }
}
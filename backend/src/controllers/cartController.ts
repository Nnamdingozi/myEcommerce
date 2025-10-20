import 'dotenv/config';
import { Request, Response } from 'express';
import {
  upsertItemInCart,
  getUserCart,
  deleteItemFromCart,
  getCartItemByIdForUser, 
  updateCartItemQuantity
} from '../services/cartService';
import { handleErrorResponse } from '../lib/error/handleErrorResponse';
import { User as PrismaUser } from '@prisma/client'; 
import logger from '../lib/logger';


export const upsertItemHandler = async (req: Request, res: Response) => {
  // --- LOG 1: Announce the start of the operation ---
 console.log('[HANDLER - upsertItem]: Received request to upsert cart item.');
  
  try {
    const user = req.user as PrismaUser;
    const userId = user?.id;

    // --- 2. VALIDATE: User Authentication ---
    if (!userId) {
      // This case is rare if `authenticate` middleware is used, but it's a good safeguard.
     console.error('[HANDLER - upsertItem]: Authentication check failed. No user ID found on request.');
      res.status(401).json({ error: 'User not authenticated.' });
      return;
    }

    // --- 3. VALIDATE: Request Body ---
    const { productId, quantity } = req.body;
   console.log(`[HANDLER - upsertItem]: Payload received for user ${userId}:`, { productId, quantity });

    if (!productId || typeof productId !== 'number') {
     console.error('[HANDLER - upsertItem]: Validation failed. Invalid or missing productId.');
      res.status(400).json({ error: 'A valid Product ID is required.' });
      return;
    }
    
    // Quantity is optional, but if provided, it must be a valid number.
    if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 1)) {
       console.error('[HANDLER - upsertItem]: Validation failed. Invalid quantity provided.');
        res.status(400).json({ error: 'Quantity must be a positive number.' });
        return;
    }

    // --- 4. EXECUTE: Call the Service Layer ---
   console.log(`[HANDLER - upsertItem]: Validation passed. Calling cartService.upsertItemInCart...`);
    // The service function will handle the core logic of finding or creating the item.
    // We pass the validated data to it.
    const cartItem = await upsertItemInCart(userId, productId, quantity);
    
    // --- 5. RESPOND: Send Success Response ---
   console.log(`[HANDLER - upsertItem]: Operation successful. Returning updated cart item ID: ${cartItem.id}`);
    res.status(200).json(cartItem);

  } catch (error) {
    // --- 6. CATCH & LOG: Handle any errors from the service ---
   console.error('[HANDLER - upsertItem]: An error occurred during the upsert operation.', error);
    handleErrorResponse(error, res);
  }
};

//Gets all items in the current user's cart.
export const getUserCartHandler = async (req: Request, res: Response): Promise<void> => {
 try {
  const user = req.user as PrismaUser;
  const userId = user?.id;
   if (!userId) {
     res.status(401).json({ message: 'User not authenticated' });
     return;
   }

   // Call the simple, clean service function.
   const userCart = await getUserCart(userId);

   // Prisma returns an empty array if no items are found, which is often the desired response.
   // No need to throw a 404 error.
   res.status(200).json(userCart);

 } catch (err: any) {
   handleErrorResponse(err, res);
 }
};

/**
 * Gets a single cart item by its ID for the authenticated user.
 */
export const getSingleCartItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as PrismaUser;
    const userId = user?.id;
    // The cart item's ID will come from the URL parameters (e.g., /cart/items/:id)
    const cartItemId = Number(req.params.id);

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }
    if (!cartItemId) {
      res.status(400).json({ message: 'Cart Item ID is required in the URL.' });
      return;
    }

    // Call our new, secure service function
    const cartItem = await getCartItemByIdForUser(userId, cartItemId);

    if (cartItem) {
      // If the item was found, return it
      res.status(200).json(cartItem);
    } else {
      // If the service returned `null`, it means the item either doesn't exist
      // or doesn't belong to this user. For security, we give a generic "Not Found".
      res.status(404).json({ message: 'Cart item not found.' });
    }

  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};


   /**
 * Handles the PUT /api/cart/:id endpoint.
 * Updates the quantity of a specific item in the user's cart.
 */
export const updateItemHandler = async (req: Request, res: Response) => {
  // --- LOG 1: Announce the start of the operation ---
 console.log('[HANDLER - updateItem]: Received request to update cart item quantity.');
  
  try {
    // --- 2. VALIDATE: User Authentication ---
    const user = req.user as PrismaUser;
    const userId = user?.id;

    if (!userId) {
     console.error('[HANDLER - updateItem]: Authentication check failed. No user ID found.');
      res.status(401).json({ error: 'User not authenticated.' });
      return;
    }

    // --- 3. VALIDATE: URL Parameter and Request Body ---
    const itemId = parseInt(req.params.id, 10);
    const { quantity } = req.body;
    
   console.log(`[HANDLER - updateItem]: Payload received for user ${userId}:`, { itemId, quantity });

    if (isNaN(itemId)) {
     console.error('[HANDLER - updateItem]: Validation failed. Invalid item ID in URL.');
      res.status(400).json({ error: 'A valid numeric item ID is required in the URL.' });
      return;
    }

    // The quantity can be 0 (to delete), but it must be a number.
    if (typeof quantity !== 'number' || quantity < 0) {
     console.error('[HANDLER - updateItem]: Validation failed. Invalid quantity provided.');
      res.status(400).json({ error: 'A valid, non-negative quantity is required.' });
      return;
    }

    // --- 4. EXECUTE: Call the Service Layer ---
   console.log(`[HANDLER - updateItem]: Validation passed. Calling cartService.updateCartItemQuantity...`);
    
    const updatedCartItem = await updateCartItemQuantity(itemId, quantity, userId);

    // --- 5. RESPOND: Send Success Response ---
    if (updatedCartItem) {
      // If the item was updated, send back the updated item.
     console.log(`[HANDLER - updateItem]: Operation successful. Returning updated item ID: ${updatedCartItem.id}`);
      res.status(200).json(updatedCartItem);
    } else {
      // If the service returned null, it means the item was deleted (quantity was set to 0).
      // A 204 No Content response is appropriate here.
     console.log(`[HANDLER - updateItem]: Operation successful. Item ID: ${itemId} was deleted.`);
      res.status(204).send();
    }

  } catch (error) {
    // --- 6. CATCH & LOG: Handle any errors from the service ---
   console.error('[HANDLER - updateItem]: An error occurred during the update operation.', error);
    handleErrorResponse(error, res);
  }
};

/**
 * Deletes a specific item from the user's cart.
 */
export const deleteItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as PrismaUser;
    const userId = user?.id;
    const cartItemId = Number(req.params.id); // Assuming the ID is in the URL path, e.g., /cart/items/:id

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }
    if (!cartItemId) {
      res.status(400).json({ message: 'Cart Item ID is required in the URL.' });
      return;
    }

    // Call the secure delete function.
    const result = await deleteItemFromCart(userId, cartItemId);

    res.status(200).json(result); // e.g., { message: "Successfully deleted cart item." }

  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};




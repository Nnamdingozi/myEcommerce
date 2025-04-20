import 'dotenv/config';
import { Request, Response } from 'express';
import {
  addItemsToCart,
  getItemByUserId,
  getCartItemById,
  updateCartItems,
  deleteCartItem,
} from '../services/cartService';

// Add item to cart
export const addItemsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' });
      return;
    }

    const newItem = await addItemsToCart(userId, productId);

    if (newItem) {
      res.status(201).json(newItem);
    } else {
      res.status(400).json({ message: 'Unable to add item to cart' });
    }
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};

// Get cart items by user ID
export const getItemsByUserIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userCart = await getItemByUserId(userId);

    if (!userCart || userCart.length === 0) {
      res.status(404).json({ message: 'No items found in cart' });
      return;
    }

    res.status(200).json(userCart);
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};

// Get a single cart item by user ID
export const getCartItemByIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const cartItem = await getCartItemById(userId);

    if (!cartItem) {
      res.status(404).json({ message: 'No cart items found' });
      return;
    }

    res.status(200).json(cartItem);
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};

// Update cart item quantity
export const updateCartItemsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.id);
    const id = Number(req.params.id);
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      res.status(400).json({ message: 'Valid quantity is required' });
      return;
    }

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const updatedItem = await updateCartItems(id, quantity, userId);

    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};

// Delete cart item
export const deleteCartItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.id);
    const cartItemId = Number(req.params.cartItemId);

    if (!userId || !cartItemId) {
      res.status(400).json({ message: 'User ID or Cart Item ID is missing' });
      return;
    }

    const deletedItemResponse = await deleteCartItem(userId, cartItemId);

    if (deletedItemResponse && deletedItemResponse.message) {
      res.status(200).json({ message: deletedItemResponse.message });
    } else {
      res.status(404).json({ message: 'Item not found or already deleted' });
    }
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
};

// Unified error handling function
const handleErrorResponse = (err: Error, res: Response): void => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: 'Invalid JSON format' });
    return;
  }

  if ('name' in err && (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
};

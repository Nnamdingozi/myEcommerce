"use strict";
// require('dotenv').config();
// const { 
//     addItemsToCart, 
//     getItemByUserId, 
//     getCartItemsById, 
//     updateCartItems, 
//     deleteCartItem 
// } = require('../services/cartService');
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItemHandler = exports.updateCartItemsHandler = exports.getCartItemByIdHandler = exports.getItemsByUserIdHandler = exports.addItemsHandler = void 0;
// // Add item to cart
// const addItemsHandler = async (req, res) => {
//     try { 
//         const userId = req.user?.id;
//         const { productId } = req.body;
//         if (!productId) {
//             return res.status(400).json({ message: 'Product ID is required' });
//         }
//         const newItem = await addItemsToCart(userId, productId);
//         if (newItem) {
//             res.status(201).json(newItem);
//         } else {
//             res.status(400).json({ message: 'Unable to add item to cart' });
//         }
//     } catch (err) {
//         handleErrorResponse(err, res);
//     }
// };
// // Get cart items by user ID
// const getItemByUserIdHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const userCart = await getItemByUserId(userId);
//         if (!userCart || userCart.length === 0) {
//             return res.status(404).json({ message: 'No items found in cart' });
//         }
//         res.status(200).json(userCart);
//     } catch (err) {
//         handleErrorResponse(err, res);
//     }
// };
// // Get cart items with user ID
// const getCartItemsByIdHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const cartItems = await getCartItemsById(userId);
//         if (!cartItems || cartItems.length === 0) {
//             return res.status(404).json({ message: 'No cart items found' });
//         }
//         res.status(200).json(cartItems);
//     } catch (err) {
//         handleErrorResponse(err, res);
//     }
// };
// // Update cart item quantity
// const updateCartItemsHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const { id } = req.params;
//         const { quantity } = req.body;
//         if (!quantity || quantity <= 0) {
//             return res.status(400).json({ message: 'Valid quantity is required' });
//         }
//         const updatedItem = await updateCartItems(id, quantity, userId);
//         if (updatedItem) {
//             res.status(200).json(updatedItem);
//         } else {
//             res.status(404).json({ message: 'Item not found' });
//         }
//     } catch (err) {
//         handleErrorResponse(err, res);
//     }
// };
// // Delete cart item
// const deleteCartItemHandler = async (req, res) => {
//     try {
//         const userId = req.user?.id;
//         const cartItemId = req.params.cartItemId;
//         // Ensure userId and cartItemId are provided
//         if (!userId || !cartItemId) {
//             return res.status(400).json({ message: 'User ID or Cart Item ID is missing' });
//         }
//         // Call the service to delete the cart item
//         const deletedItemResponse = await deleteCartItem(userId, cartItemId);
//         // Return the message from the service, or a 404 if no item was found
//         if (deletedItemResponse && deletedItemResponse.message) {
//             res.status(200).json({ message: deletedItemResponse.message });
//         } else {
//             res.status(404).json({ message: 'Item not found or already deleted' });
//         }
//     } catch (err) {
//         handleErrorResponse(err, res);
//     }
// };
// // Unified error handling function
// const handleErrorResponse = (err, res) => {
//     if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
//         return res.status(401).json({ message: 'Invalid or expired token' });
//     }
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Something went wrong' });
// };
// module.exports = {
//     addItemsHandler,
//     getItemByUserIdHandler,
//     getCartItemsByIdHandler,
//     updateCartItemsHandler,
//     deleteCartItemHandler
// };
// import 'dotenv/config';
// import { Request, Response, NextFunction } from 'express';
// import { 
//   addItemsToCart, 
//   getItemByUserId, 
//   getCartItemById, 
//   updateCartItems, 
//   deleteCartItem 
// } from '../services/cartService';
// import { IUser } from '../interface/IUser';
// import { AuthenticatedRequest } from '../interface/AuthenticateRequest';
// // Add item to cart
// export const addItemsHandler = async (
//   req: AuthenticatedRequest, 
//   res: Response
// ): Promise<Response | void> => {
//   try {
//     const userId = req.user?.id;
//     const { productId } = req.body;
//     if (!userId) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }
//     if (!productId) {
//       return res.status(400).json({ message: 'Product ID is required' });
//     }
//     const newItem = await addItemsToCart(userId, productId);
//     if (newItem) {
//       return res.status(201).json(newItem);
//     } else {
//       return res.status(400).json({ message: 'Unable to add item to cart' });
//     }
//   } catch (err: any) {
//     return handleErrorResponse(err, res);
//   }
// };
// // Get cart items by user ID
// export const getItemsByUserIdHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }
//     const userCart = await getItemByUserId(userId);
//     if (!userCart || userCart.length === 0) {
//       return res.status(404).json({ message: 'No items found in cart' });
//     }
//     return res.status(200).json(userCart);
//   } catch (err: any) {
//     return handleErrorResponse(err, res);
//   }
// };
// // Get cart items with user ID
// export const getCartItemByIdHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }
//     const cartItem = await getCartItemById(userId);
//     if (!cartItem) {
//       return res.status(404).json({ message: 'No cart items found' });
//     }
//     return res.status(200).json(cartItem);
//   } catch (err: any) {
//     return handleErrorResponse(err, res);
//   }
// };
// // Update cart item quantity
// export const updateCartItemsHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
//   try {
//     const userId = req.user?.id;
//     const id = Number(req.params.id);
//     const { quantity } = req.body;
//     if (!quantity || quantity <= 0) {
//       return res.status(400).json({ message: 'Valid quantity is required' });
//     }
//     if (!userId) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }
//     const updatedItem = await updateCartItems(id, quantity, userId);
//     if (updatedItem) {
//       return res.status(200).json(updatedItem);
//     } else {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//   } catch (err: any) {
//     return handleErrorResponse(err, res);
//   }
// };
// // Delete cart item
// export const deleteCartItemHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response | void> => {
//   try {
//     const userId = req.user?.id;
//     const cartItemId = Number(req.params.cartItemId);
//     // Ensure userId and cartItemId are provided
//     if (!userId || !cartItemId) {
//       return res.status(400).json({ message: 'User ID or Cart Item ID is missing' });
//     }
//     // Call the service to delete the cart item
//     const deletedItemResponse = await deleteCartItem(userId, cartItemId);
//     // Return the message from the service, or a 404 if no item was found
//     if (deletedItemResponse && deletedItemResponse.message) {
//       return res.status(200).json({ message: deletedItemResponse.message });
//     } else {
//       return res.status(404).json({ message: 'Item not found or already deleted' });
//     }
//   } catch (err: any) {
//     return handleErrorResponse(err, res);
//   }
// };
// // Unified error handling function
// const handleErrorResponse = (err: Error, res: Response): Response => {
//   if (err instanceof SyntaxError) {
//     return res.status(400).json({ error: 'Invalid JSON format' });
//   }
//   if ('name' in err && (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError')) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
//   console.error('Unhandled error:', err);
//   return res.status(500).json({ error: 'Something went wrong' });
// };
require("dotenv/config");
const cartService_1 = require("../services/cartService");
// import { AuthenticatedRequest } from '../interface/AuthenticateRequest';
// Add item to cart
const addItemsHandler = async (req, res) => {
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
        const newItem = await (0, cartService_1.addItemsToCart)(userId, productId);
        if (newItem) {
            res.status(201).json(newItem);
        }
        else {
            res.status(400).json({ message: 'Unable to add item to cart' });
        }
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
};
exports.addItemsHandler = addItemsHandler;
// Get cart items by user ID
const getItemsByUserIdHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        const userCart = await (0, cartService_1.getItemByUserId)(userId);
        if (!userCart || userCart.length === 0) {
            res.status(404).json({ message: 'No items found in cart' });
            return;
        }
        res.status(200).json(userCart);
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
};
exports.getItemsByUserIdHandler = getItemsByUserIdHandler;
// Get cart items with user ID
const getCartItemByIdHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        const cartItem = await (0, cartService_1.getCartItemById)(userId);
        if (!cartItem) {
            res.status(404).json({ message: 'No cart items found' });
            return;
        }
        res.status(200).json(cartItem);
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
};
exports.getCartItemByIdHandler = getCartItemByIdHandler;
// Update cart item quantity
const updateCartItemsHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
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
        const updatedItem = await (0, cartService_1.updateCartItems)(id, quantity, userId);
        if (updatedItem) {
            res.status(200).json(updatedItem);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
};
exports.updateCartItemsHandler = updateCartItemsHandler;
// Delete cart item
const deleteCartItemHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        const cartItemId = Number(req.params.cartItemId);
        if (!userId || !cartItemId) {
            res.status(400).json({ message: 'User ID or Cart Item ID is missing' });
            return;
        }
        const deletedItemResponse = await (0, cartService_1.deleteCartItem)(userId, cartItemId);
        if (deletedItemResponse && deletedItemResponse.message) {
            res.status(200).json({ message: deletedItemResponse.message });
        }
        else {
            res.status(404).json({ message: 'Item not found or already deleted' });
        }
    }
    catch (err) {
        handleErrorResponse(err, res);
    }
};
exports.deleteCartItemHandler = deleteCartItemHandler;
// Unified error handling function
const handleErrorResponse = (err, res) => {
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

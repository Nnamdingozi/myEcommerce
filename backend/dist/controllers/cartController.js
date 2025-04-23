"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItemHandler = exports.updateCartItemsHandler = exports.getCartItemByIdHandler = exports.getItemsByUserIdHandler = exports.addItemsHandler = void 0;
require("dotenv/config");
const cartService_1 = require("../services/cartService");
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
        const userId = Number(req.user?.id);
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
// Get a single cart item by user ID
const getCartItemByIdHandler = async (req, res) => {
    try {
        const userId = Number(req.user?.id);
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
        const userId = Number(req.user?.id);
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

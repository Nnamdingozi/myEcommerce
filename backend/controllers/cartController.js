require('dotenv').config();
const { 
    addItemsToCart, 
    getItemByUserId, 
    getCartItemsById, 
    updateCartItems, 
    deleteCartItem 
} = require('../services/cartService');

// Add item to cart
const addItemsHandler = async (req, res) => {
    try { 
        const userId = req.user?.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const newItem = await addItemsToCart(userId, productId);

        if (newItem) {
            res.status(201).json(newItem);
        } else {
            res.status(400).json({ message: 'Unable to add item to cart' });
        }
    } catch (err) {
        handleErrorResponse(err, res);
    }
};

// Get cart items by user ID
const getItemByUserIdHandler = async (req, res) => {
    try {
        const userId = req.user?.id;

        const userCart = await getItemByUserId(userId);

        if (!userCart || userCart.length === 0) {
            return res.status(404).json({ message: 'No items found in cart' });
        }

        res.status(200).json(userCart);
    } catch (err) {
        handleErrorResponse(err, res);
    }
};

// Get cart items with user ID
const getCartItemsByIdHandler = async (req, res) => {
    try {
        const userId = req.user?.id;

        const cartItems = await getCartItemsById(userId);

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No cart items found' });
        }

        res.status(200).json(cartItems);
    } catch (err) {
        handleErrorResponse(err, res);
    }
};

// Update cart item quantity
const updateCartItemsHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Valid quantity is required' });
        }

        const updatedItem = await updateCartItems(id, quantity, userId);

        if (updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        handleErrorResponse(err, res);
    }
};

// Delete cart item
const deleteCartItemHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        const cartItemId = req.params.cartItemId;

        const deletedItem = await deleteCartItem(userId, cartItemId);

        if (deletedItem) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        handleErrorResponse(err, res);
    }
};

// Unified error handling function
const handleErrorResponse = (err, res) => {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
};

module.exports = {
    addItemsHandler,
    getItemByUserIdHandler,
    getCartItemsByIdHandler,
    updateCartItemsHandler,
    deleteCartItemHandler
};

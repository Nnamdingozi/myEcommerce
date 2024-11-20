
require('dotenv').config();
const {addItemsToCart, getItemByUserId, getCartItemsById, updateCartItems, deleteCartItem} = require('../services/cartService');

const addItemsHandler = async (req, res) => {
    
    try { 
        const userId = req.user.id; 

        const { productId } = req.body;
        console.log('Controller - userId:', userId, 'productId:', productId);

        // Add the item to the cart
        const newItem = await addItemsToCart(userId, productId);
        if (newItem) {
            res.status(201).json(newItem);
        } else {
            res.status(400).json({ message: 'Unable to add item to cart' });
        }
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ error: err.message });
    }
};



// Handler to get items by user ID (retrieved from the token)
const getItemByUserIdHandler = async (req, res) => {
   
    try {
        
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }

        const userCart = await getItemByUserId(userId);
        console.log('User\'s cart found:', userCart);
        res.status(200).json(userCart);
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ error: err.message });
    }
};


// Handler to get items by user ID (retrieved from the token)
const getCartItemsByIdHandler = async (req, res) => {
  
    try {
            const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }

        const item = await getCartItemsById(req.params.id)
        console.log('Cart item found', userCart);
        res.status(200).json(userCart);
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ error: err.message });
    }
};


const updateCartItemsHandler = async (req, res) => {
 
    try {
   
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }
        const { id }= req.params;
        const {quantity} = req.body;
        const updatedItem = await updateCartItems(id, quantity, userId);
        if(updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({error: 'Item not found'})
        }

    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ error: err.message });
    }
};





const deleteCartItemHandler = async (req, res) => {

    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }
        const cartItemId = req.params.cartItemId;

        console.log('userId in controller, deleteCartItem:', userId + 'cartItemId in controller, deleteCartItem:', cartItemId)

        const deletedItem = await deleteCartItem(userId, cartItemId);
        if(deletedItem) {
            res.status(204).json()
        } else {
            res.status(404).json({error: 'Item not found'})
        }

    }  catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    addItemsHandler,
    getItemByUserIdHandler,
    getCartItemsByIdHandler,
    updateCartItemsHandler,
    deleteCartItemHandler
};

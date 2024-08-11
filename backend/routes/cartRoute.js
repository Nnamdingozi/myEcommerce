const express = require('express');
const cartRoute = express.Router();

const { addItemsHandler,
    getCartItemsByIdHandler,
    updateCartItemsHandler,
    deleteCartItemHandler,
    } = require('../controllers/cartController');

    cartRoute.post('/', addItemsHandler);
    cartRoute.get('/:id', getCartItemsByIdHandler);
    // cartRoute.get('/total/:userId', calcCartTotalHandler)
    cartRoute.put('/:id', updateCartItemsHandler);
    cartRoute.delete('/:id', deleteCartItemHandler);

    module.exports = cartRoute



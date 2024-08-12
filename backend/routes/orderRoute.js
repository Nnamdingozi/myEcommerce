const { createOrderHandler, getAllOrderHandler, getOrderByIdHandler } = require('../controllers/orderController');

const express = require('express');
const orderRoute = express.Router();

orderRoute.post('/', createOrderHandler);
orderRoute.get('/', getAllOrderHandler);
orderRoute.get('/:id', getOrderByIdHandler);

module.exports = orderRoute;
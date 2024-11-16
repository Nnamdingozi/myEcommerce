const { createOrder, getAllOrder, getOrderById } = require('../services/orderService');
const { Order, } = require('../database/models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const createOrderHandler = async (req, res) => {
  
    try {
            const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }
        const { paymentMtd, shippingAddy, shippingMtd, curr } = req.body
        const newOrder = await createOrder(userId, paymentMtd, shippingAddy, shippingMtd, curr);
        console.log('new order created in createorderhandler:', newOrder)
        if (newOrder) {

            return res.status(200).json({ orderId: newOrder.id });
        } else {
            res.status(400).json('error while creating order')
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};


const getAllOrderHandler = async (req, res) => {
  
   try {
             const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }

        const orders = await getAllOrder(userId);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found' })
        } else {
            res.status(200).json(orders)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderByIdHandler = async (req, res) => {
 
    try {
            const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID required' });
        }

        const { orderId } = req.params
        const order = await getOrderById(orderId, userId);
        if (!order) {
            res.status(404).json('Order not found')
        } else {
            res.status(200).json(order)
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createOrderHandler,
    getAllOrderHandler,
    getOrderByIdHandler
};
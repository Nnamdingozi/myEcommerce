"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByIdHandler = exports.getAllOrderHandler = exports.createOrderHandler = void 0;
const orderService_1 = require("../services/orderService");
// Create Order Handler
const createOrderHandler = async (req, res) => {
    try {
        const userId = Number(req.user?.id);
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const { paymentMtd, shippingAddy, shippingMtd, curr } = req.body;
        if (!paymentMtd || !shippingAddy || !shippingMtd || !curr) {
            res.status(400).json({ message: 'All required order fields must be provided' });
            return;
        }
        const orderData = {
            payment_method: paymentMtd,
            shipping_address: shippingAddy,
            shipping_method: shippingMtd,
            currency: curr,
        };
        const newOrder = await (0, orderService_1.createOrder)(orderData, userId);
        if (newOrder) {
            res.status(201).json(newOrder);
        }
        else {
            res.status(400).json({ message: 'Error while creating order' });
        }
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createOrderHandler = createOrderHandler;
// Get All Orders Handler
const getAllOrderHandler = async (req, res, next) => {
    try {
        const userId = Number(req.user?.id);
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const orders = await (0, orderService_1.getAllOrder)(userId);
        if (!orders || orders.length === 0) {
            res.status(404).json({ message: 'No orders found' });
            return;
        }
        res.status(200).json(orders);
    }
    catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllOrderHandler = getAllOrderHandler;
// Get Order By ID Handler
const getOrderByIdHandler = async (req, res) => {
    try {
        const userId = Number(req.user?.id);
        const { orderId } = req.params;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        // Convert orderId to a number for the service call
        if (!orderId || isNaN(Number(orderId))) {
            res.status(400).json({ message: 'Valid order ID is required' });
            return;
        }
        const order = await (0, orderService_1.getOrderById)(Number(orderId), userId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json(order);
    }
    catch (err) {
        console.error('Error fetching order by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getOrderByIdHandler = getOrderByIdHandler;

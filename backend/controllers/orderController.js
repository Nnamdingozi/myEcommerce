const { createOrder, getAllOrder, getOrderById } = require('../services/orderService');

const createOrderHandler = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const { paymentMtd, shippingAddy, shippingMtd, curr } = req.body;

        if (!paymentMtd || !shippingAddy || !shippingMtd || !curr) {
            return res.status(400).json({ message: 'All order fields are required' });
        }

        const newOrder = await createOrder(userId, paymentMtd, shippingAddy, shippingMtd, curr);

        if (newOrder) {
            return res.status(201).json({ orderId: newOrder.id });
        } else {
            return res.status(400).json({ message: 'Error while creating order' });
        }
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllOrderHandler = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const orders = await getAllOrder(userId);

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderByIdHandler = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { orderId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!orderId || isNaN(orderId)) {
            return res.status(400).json({ message: 'Valid order ID is required' });
        }

        const order = await getOrderById(orderId, userId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createOrderHandler,
    getAllOrderHandler,
    getOrderByIdHandler
};

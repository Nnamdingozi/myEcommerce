const { createOrder, getAllOrder, getOrderById } = require('../services/orderService');


const createOrderHandler = async (req, res) => {
    try {
const { userId } = req.user.id
        const { paymentMtd, shippingAddy, shippingMtd, curr } = req.body
        const newOrder = await createOrder(userId, paymentMtd, shippingAddy, shippingMtd, curr);
        if (newOrder) {
            res.status(200).json(newOrder);
        } else {
            res.status(400).json('error while creating order')
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

const getAllOrderHandler = async (req, res) => {
    try {
        const { user_id } = req.body;
        const orders = await getAllOrder(user_id);
        if (!orders || orders.length === 0) {
          return  res.status(404).json({message: 'Orders not found'})
        } else {
            res.status(200).json(orders)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderByIdHandler = async(req, res) => {
    try {
        const { user_id} = req.body;
    const { id } = req.params
const order = await getOrderById(id, user_id);
if (!order) {
    res.status(404).json('Order not found')
} else {
    res.status(200).json(order)
}

    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createOrderHandler,
    getAllOrderHandler,
    getOrderByIdHandler
};
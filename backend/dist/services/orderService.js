"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getAllOrder = exports.createOrder = void 0;
const cart_1 = __importDefault(require("../database/models/cart"));
const order_1 = __importDefault(require("../database/models/order"));
const orderitem_1 = __importDefault(require("../database/models/orderitem"));
const product_1 = __importDefault(require("../database/models/product"));
const createOrder = async (orderData, userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    // Fetch cart items based on userId
    const cartItems = await cart_1.default.findAll({
        where: { user_id: userId },
        include: [{
                model: product_1.default,
                as: 'cartproduct',
            }],
    });
    // Calculate the total amount from cart items
    const totalAmount = cartItems.reduce((acc, cartItem) => acc + Number(cartItem.total), 0);
    if (totalAmount === 0) {
        throw new Error('Cart is empty');
    }
    // Generate a tracking number for the order
    const trackingNumber = () => Math.floor(Math.random() * 1000000).toString();
    const newTrackingNumber = trackingNumber();
    const NewOrderData = {
        user_id: userId,
        status: 'pending',
        total_amount: totalAmount,
        payment_status: 'unpaid',
        ...orderData,
        tracking_number: newTrackingNumber,
    };
    // Create the order 
    const order = await order_1.default.create(NewOrderData);
    // Prepare order items for bulk insertion
    const orderItems = cartItems.map(cartItem => ({
        order_id: order.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
    }));
    // Insert the order items into the database
    await orderitem_1.default.bulkCreate(orderItems);
    // Clear the cart after the order has been created
    await cart_1.default.destroy({ where: { user_id: userId } });
    // Fetch the order with the populated details
    const orderWithDetails = await order_1.default.findOne({
        where: { id: order.id },
        include: [{
                model: orderitem_1.default,
                as: 'orderItems',
                include: [{
                        model: product_1.default,
                        as: 'product',
                    }],
            }],
    });
    return orderWithDetails?.get({ plain: true });
};
exports.createOrder = createOrder;
// get all order for a user
const getAllOrder = async (userId) => {
    const orders = await order_1.default.findAll({
        where: { user_id: userId },
        include: [{
                model: orderitem_1.default,
                as: 'orderItems'
            }],
        order: [['createdAt', 'DESC']]
    });
    if (!orders.length) {
        throw new Error('No orders found');
    }
    return orders;
};
exports.getAllOrder = getAllOrder;
const getOrderById = async (orderId, userId) => {
    const order = await order_1.default.findOne({
        where: {
            id: orderId,
            user_id: userId
        },
        include: [{
                model: orderitem_1.default,
                as: 'orderItems',
            }]
    });
    return order;
};
exports.getOrderById = getOrderById;

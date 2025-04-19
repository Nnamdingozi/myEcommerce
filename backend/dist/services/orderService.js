"use strict";
// const { Cart, Order, OrderItem, Product } = require('../database/models');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = exports.getAllOrder = exports.createOrder = void 0;
// const createOrder = async (userId, paymentMtd, shippingAddy, shippingMtd, curr) => {
//     // Get cart items for the user
//     const cartItems = await Cart.findAll({
//         where: { user_id: userId },
//         include: [{
//             model: Product,
//             as: 'cartproduct',
//         }],
//     });
//     const totalAmount = cartItems.reduce((acc, cartItem) => {
//         return acc + parseFloat(cartItem.total);
//     }, 0);
//     if (totalAmount === 0) {
//         throw new Error('Cart is empty');
//     }
//     // Generate a tracking number
//     const trackingNumber = () => {
//         return Math.floor(Math.random() * 1000000);
//     };
//     const newNum = trackingNumber().toString();
//     // Create the order
//     const order = await Order.create({
//         user_id: userId,
//         status: 'pending',
//         total_amount: totalAmount,
//         payment_status: 'pending',
//         payment_method: paymentMtd,
//         shipping_address: shippingAddy,
//         shipping_method: shippingMtd,
//         tracking_number: newNum,
//         currency: curr,
//     });
//     // Create the order items associated with the order
//     const orderItems = cartItems.map(cartItem => ({
//         order_id: order.id,
//         product_id: cartItem.product_id,
//         quantity: cartItem.quantity,
//     }));
//     await OrderItem.bulkCreate(orderItems);
//     // Clear the cart
//     await Cart.destroy({ where: { user_id: userId } });
//     // Include the order items and product details when returning the order
//     const orderWithDetails = await Order.findOne({
//         where: { id: order.id },
//         include: [{
//             model: OrderItem,
//             as: 'order',
//             include: [{
//                 model: Product,
//                 as: 'product', // Include product details in the order items
//             }],
//         }],
//     });
//     return orderWithDetails;  // Return the full order with items and product details
// };
// const getAllOrder = async (userId) => {
//     const orders = await Order.findAll({
//         where: { user_id: userId },
//             include: [{
//                 model: OrderItem,
//                 as: 'order'
//         }],
//         order: [['createdAt', 'DESC']]
//     });
//     if (!orders) {
//         throw new Error('order not found')
//     } else {
//         return orders
//     }
// };
// const getOrderById = async (orderId, userId) => {
//     const order = await Order.findOne({
//          where: { 
//             id: orderId,
//             user_id: userId
//          },
//          include: [{
//             model: OrderItem,
//             as: 'order',
//          }]
//          });
//          if(!order) {
//             return null;
//          } else {return order}
// }
// module.exports = {
//     createOrder,
//     getAllOrder,
//     getOrderById
// }
const cart_1 = __importDefault(require("../database/models/cart"));
const order_1 = __importDefault(require("../database/models/order"));
const orderitem_1 = __importDefault(require("../database/models/orderitem"));
const product_1 = __importDefault(require("../database/models/product"));
const createOrder = async (orderData) => {
    // Extract userId from orderData
    const userId = orderData.user_id;
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
        ...orderData,
        total_amount: totalAmount,
        tracking_number: newTrackingNumber,
        status: 'pending',
    };
    // Create the order with the provided orderData and auto-generated fields (status, tracking_number, total_amount)
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
                as: 'order',
                include: [{
                        model: product_1.default,
                        as: 'product',
                    }],
            }],
    });
    return orderWithDetails;
};
exports.createOrder = createOrder;
const getAllOrder = async (userId) => {
    const orders = await order_1.default.findAll({
        where: { user_id: userId },
        include: [{
                model: orderitem_1.default,
                as: 'order'
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
                as: 'order',
            }]
    });
    return order;
};
exports.getOrderById = getOrderById;

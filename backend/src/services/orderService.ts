// const { Cart, Order, OrderItem, Product } = require('../database/models');


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


import  Cart from '../database/models/cart';
import Order from '../database/models/order';
import OrderItem from '../database/models/orderitem';
import Product from '../database/models/product'
import { OrderAttributes, OrderInput, OrderCreation } from 'interface/OrderAttributes';

interface OrderItemData {
    order_id: number;
    product_id: number;
    quantity: number;
}


export const createOrder = async (orderData: OrderInput, userId: number): Promise<OrderAttributes> => {
  // Extract userId from orderData
 

  if (!userId) {
    throw new Error('User ID is required');
  }

  // Fetch cart items based on userId
  const cartItems = await Cart.findAll({
    where: { user_id: userId },
    include: [{
      model: Product,
      as: 'cartproduct',
    }],
  });

  // Calculate the total amount from cart items
  const totalAmount = cartItems.reduce((acc, cartItem) => acc + Number(cartItem.total), 0);
  if (totalAmount === 0) {
    throw new Error('Cart is empty');
  }

  // Generate a tracking number for the order
  const trackingNumber = (): string => Math.floor(Math.random() * 1000000).toString();
  const newTrackingNumber = trackingNumber();

  const NewOrderData: OrderCreation  = {
    user_id: userId,
    status: 'pending',
    total_amount: totalAmount, 
    payment_status: 'unpaid',
    ...orderData, 
    tracking_number: newTrackingNumber,
   

  }




  // Create the order with the provided orderData and auto-generated fields (status, tracking_number, total_amount)
  const order = await Order.create(NewOrderData);

  // Prepare order items for bulk insertion
  const orderItems: OrderItemData[] = cartItems.map(cartItem => ({
    order_id: order.id,
    product_id: cartItem.product_id,
    quantity: cartItem.quantity,
  }));

  // Insert the order items into the database
  await OrderItem.bulkCreate(orderItems);

  // Clear the cart after the order has been created
  await Cart.destroy({ where: { user_id: userId } });

  // Fetch the order with the populated details
  const orderWithDetails = await Order.findOne({
    where: { id: order.id },
    include: [{
      model: OrderItem,
      as: 'orderItems',
      include: [{
        model: Product,
        as: 'product',
      }],
    }],
  });

  return orderWithDetails?.get({ plain: true }) as OrderAttributes;
};

export const getAllOrder = async (userId: number): Promise<OrderAttributes[]> => {
    const orders = await Order.findAll({
        where: { user_id: userId },
        include: [{
            model: OrderItem,
            as: 'orderItems'
        }],
        order: [['createdAt', 'DESC']]
    });

if (!orders.length) {
        throw new Error('No orders found');
    }

    return orders as OrderAttributes[];
};

export const getOrderById = async (orderId: number, userId: number): Promise<OrderAttributes> => {
    const order = await Order.findOne({
        where: {
            id: orderId,
            user_id: userId
        },
        include: [{
            model: OrderItem,
            as: 'orderItems',
        }]
    });

    return order as OrderAttributes;
};

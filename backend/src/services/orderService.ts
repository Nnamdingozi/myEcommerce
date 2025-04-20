
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

  // Create the order 
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

// get all order for a user
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

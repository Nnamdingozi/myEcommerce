
import { RequestHandler } from 'express';
import { createOrder, getAllOrder, getOrderById } from '../services/orderService';
import { OrderInput } from 'interface/OrderAttributes';


// Create Order Handler
export const createOrderHandler: RequestHandler = async (req, res)=> {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
    }

    const { paymentMtd, shippingAddy, shippingMtd, curr} = req.body;

    if (!paymentMtd || !shippingAddy || !shippingMtd || !curr) {
     res.status(400).json({ message: 'All required order fields must be provided' });
     return;
    }

    const orderData: OrderInput = {
      payment_method: paymentMtd,
      shipping_address: shippingAddy,
      shipping_method: shippingMtd,
      currency: curr,
    };
   

    const newOrder = await createOrder(orderData, userId);

    if (newOrder) {
    res.status(201).json(newOrder);
    } else {
     res.status(400).json({ message: 'Error while creating order' });
    }

  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get All Orders Handler
export const getAllOrderHandler: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const orders = await getAllOrder(userId);
    if (!orders || orders.length === 0) {
      res.status(404).json({ message: 'No orders found' });
      return; 
    }

    res.status(200).json(orders);
  } catch (err: any) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Order By ID Handler
export const getOrderByIdHandler: RequestHandler = async (req, res) => {
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

    const order = await getOrderById(Number(orderId), userId);
    if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
    }

  res.status(200).json(order);
  } catch (err: any) {
    console.error('Error fetching order by ID:', err);
  res.status(500).json({ message: 'Internal server error' });
  }
};



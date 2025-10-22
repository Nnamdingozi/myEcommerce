// src/controllers/orderController.ts

import { RequestHandler } from 'express';
import { 
  createOrder, 
  getAllOrdersForUser, 
  getOrderByIdForUser 
} from '../services/orderService';
import { handleErrorResponse } from '../lib/error/handleErrorResponse';
import { JwtPayload } from './authController'; // Assuming you exported this
import logger from '../lib/logger';

export const createOrderHandler: RequestHandler = async (req, res) => {
  try {
    const user = req.user as JwtPayload;
    const userId = user.id!
    console.log('USER ID and TYPE:', userId, typeof user.id)
    if (!user?.id) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    // Expect camelCase from the API request body
    const { paymentMethod, shippingAddress, shippingMethod, currency } = req.body;

    if (!paymentMethod || !shippingAddress || !shippingMethod || !currency) {
      res.status(400).json({ message: 'All required order fields must be provided' });
      return;
    }

    const newOrder = await createOrder({
      paymentMethod,
      shippingAddress,
      shippingMethod,
      currency,
    }, user.id);

    res.status(201).json(newOrder);
  } catch (error) {
    handleErrorResponse(error, res);
    logger.error("--- ERROR INSIDE createOrder SERVICE ---");
    logger.error(error); // Log the full, detailed Prisma error
    throw error; // Re-throw the error to be handled by the controller
  }
};

export const getAllOrdersHandler: RequestHandler = async (req, res) => {
  try {
    const user = req.user as JwtPayload;
    if (!user?.id) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const orders = await getAllOrdersForUser(user.id);
    // It's okay to return an empty array if the user has no orders.
    // This is not a "not found" error.
    res.status(200).json(orders);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const getOrderByIdHandler: RequestHandler = async (req, res) => {
  try {
    const user = req.user as JwtPayload;

    //---  Assert type is string and not undefined ---
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Missing item ID in URL.' });
      return;
    } 
    const orderId = parseInt(id, 10);

    if (!user?.id) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    if (isNaN(orderId)) {
      res.status(400).json({ message: 'Valid order ID is required' });
      return;
    }

    const order = await getOrderByIdForUser(orderId, user.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found or you do not have permission to view it.' });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

import express, { Router } from 'express';
import { createOrderHandler, getAllOrderHandler, getOrderByIdHandler } from '../controllers/orderController';
import { authenticate } from '../middlewares/authMiddleware';


const orderRouter: Router = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               shipping_address:
 *                 type: string
 *               shipping_method:
 *                 type: string
 *               currency:
 *                 type: string
 *             required:
 *               - user_id
 *               - payment_method
 *               - shipping_address
 *               - shipping_method
 *               - currency
 *     responses:
 *       200:
 *         description: Order created successfully
 */
orderRouter.post('/', authenticate, createOrderHandler);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders for a specific user
 *     description: Retrieves a list of all orders that belong to a user.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 */
orderRouter.get('/', authenticate, getAllOrderHandler);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Retrieve a specific order for a user
 *     description: Retrieves details of a specific order belonging to a user.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 */
orderRouter.get('/:orderId', authenticate, getOrderByIdHandler);

export default orderRouter;

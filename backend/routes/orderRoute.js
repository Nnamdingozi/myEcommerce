const { createOrderHandler, getAllOrderHandler, getOrderByIdHandler } = require('../controllers/orderController');

const express = require('express');
const orderRoute = express.Router();


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
 *                 description: ID of the user placing the order
 *               payment_method:
 *                 type: string
 *                 description: Method of payment (e.g., credit card, PayPal)
 *               shipping_address:
 *                 type: string
 *                 description: Address where the order will be shipped
 *               shipping_method:
 *                 type: string
 *                 description: Method of shipping (e.g., pick-up, home delivery)
 *               currency:
 *                 type: string
 *                 description: Currency used for the order (e.g., USD, EUR)
 *             required:
 *               - user_id
 *               - payment_method
 *               - shipping_address
 *               - shipping_method
 *               - currency
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created order
 *                 user_id:
 *                   type: string
 *                   description: ID of the user who placed the order
 *                 payment_method:
 *                   type: string
 *                   description: Payment method used for the order
 *                 shipping_address:
 *                   type: string
 *                   description: Address where the order will be shipped
 *                 shipping_method:
 *                   type: string
 *                   description: Shipping method used for the order eg pick-up, home delivery etc 
 *                 currency:
 *                   type: string
 *                   description: Currency used for the order
 *       400:
 *         description: Bad request, error while creating order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
orderRoute.post('/',  createOrderHandler);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders for a specific user
 *     description: Retrieves a list of all orders that belong to a user. The user ID is passed in the request body.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User ID to retrieve orders for
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               description: ID of the user whose orders are to be retrieved
 *               example: "123456789"
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Order ID
 *                   user_id:
 *                     type: string
 *                     description: User ID
 *                   payment_method:
 *                     type: string
 *                     description: Payment method used
 *                   shipping_address:
 *                     type: string
 *                     description: Shipping address for the order
 *                   shipping_method:
 *                     type: string
 *                     description: Shipping method chosen
 *                   currency:
 *                     type: string
 *                     description: Currency used for the order
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the order was created
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the order was last updated
 *       404:
 *         description: No orders found for the given user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Orders not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
orderRoute.get('/',  getAllOrderHandler);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve a specific order for a user
 *     description: Retrieves details of a specific order belonging to a user. The order ID is passed as a path parameter, and the user ID is passed in the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *           example: "123"
 *       - in: body
 *         name: user
 *         description: User ID to verify ownership of the order
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               description: ID of the user who owns the order
 *               example: "123"
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Order ID
 *                 user_id:
 *                   type: string
 *                   description: User ID
 *                 payment_method:
 *                   type: string
 *                   description: Payment method used
 *                 shipping_address:
 *                   type: string
 *                   description: Shipping address for the order
 *                 shipping_method:
 *                   type: string
 *                   description: Shipping method chosen
 *                 currency:
 *                   type: string
 *                   description: Currency used for the order
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the order was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: When the order was last updated
 *       400:
 *         description: Invalid user ID or order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid user ID or order ID
 *       404:
 *         description: Order not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order not found or does not belong to the user
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
orderRoute.get('/:orderId',  getOrderByIdHandler);

module.exports = orderRoute;
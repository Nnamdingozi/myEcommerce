const {  CreateCheckoutHandler, verifyCheckoutHandler } = require('../controllers/paystackController');
const express = require('express');
const {authenticate} = require('../middlewares/authMiddleware');

const checkoutRoute = express.Router();


/**
 * @swagger
 * /checkout/initialize:
 *   post:
 *     summary: Initialize a payment transaction
 *     description: Starts a payment transaction with Paystack and returns an authorization URL and reference for redirecting the user to complete the payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the order for which the transaction is being initialized.
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Payment transaction initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authorization_url:
 *                   type: string
 *                   description: URL to redirect the user for payment authorization
 *                   example: "https://paystack.com/pay/abcdef123456"
 *                 reference:
 *                   type: string
 *                   description: Unique reference for the payment transaction
 *                   example: "pay_abcdef123456"
 *       404:
 *         description: Data not created or transaction initiation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data not created"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error initializing payment transaction"
 */

checkoutRoute.post('/initialize/:orderId', authenticate,  CreateCheckoutHandler);

/**
 * @swagger
 * /checkout/verify:
 *   get:
 *     summary: Verify a payment transaction
 *     description: Verifies the payment transaction with Paystack using the provided reference and updates the order's payment status.
 *     parameters:
 *       - in: query
 *         name: reference
 *         required: true
 *         description: The unique reference for the payment transaction
 *         schema:
 *           type: string
 *           example: "pay_abcdef123456"
 *     responses:
 *       200:
 *         description: Payment transaction verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message for successful payment
 *                   example: "Payment successful"
 *                 data:
 *                   type: object
 *                   description: Detailed response from Paystack
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the payment transaction
 *                       example: "success"
 *       404:
 *         description: Unable to process transaction or transaction not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unable to process transaction"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error verifying payment transaction"
 */

checkoutRoute.get('/verify', authenticate, verifyCheckoutHandler);

module.exports = checkoutRoute
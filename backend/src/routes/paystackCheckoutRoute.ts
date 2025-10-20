// src/routes/checkoutRouter.ts

import express, { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createCheckoutHandler, verifyCheckoutHandler } from '../controllers/paystackController';

const checkoutRouter: Router = express.Router();

// All checkout routes require a user to be authenticated
checkoutRouter.use(authenticate);

// Route to initialize a payment for a specific order
checkoutRouter.post('/initialize/:orderId', createCheckoutHandler);

// Route for Paystack to call back to, or for the frontend to confirm a payment
checkoutRouter.get('/verify', verifyCheckoutHandler);

export default checkoutRouter;
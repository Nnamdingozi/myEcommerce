// src/controllers/paystackController.ts

import { Request, Response, RequestHandler } from 'express';
import { initializeTransaction, verifyTransaction } from '../services/paystackCheckoutService';
import { handleErrorResponse } from '../lib/error/handleErrorResponse';
import { JwtPayload } from './authController'; // Adjust path as needed

export const createCheckoutHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.orderId, 10);
    const user = req.user as JwtPayload;

    if (isNaN(orderId)) {
      res.status(400).json({ error: 'A valid order ID is required.' });
      return;
    }
     if (!user?.id) {
      res.status(401).json({ error: 'Authentication is required.' });
      return;
    }

    const response = await initializeTransaction(orderId, user.id);

    // The service now handles updating the order, so the controller is simpler.
    // We just return the data Paystack needs for the redirect.
    res.status(200).json(response.data);

  } catch (err) {
    handleErrorResponse(err, res);
  }
};

export const verifyCheckoutHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { reference } = req.query;

    console.log('[STEP 8 - Controller]: Received request at /checkout/verify.');
    console.log('[STEP 8 - Controller]: Extracted reference from query:', reference);

    if (!reference || typeof reference !== 'string') {
      res.status(400).json({ error: "Transaction reference is required." });
      return;
    }

    console.log('[STEP 9 - Controller]: Calling verifyTransaction service...');
    
    const response = await verifyTransaction(reference);

    // The service has already updated our DB if successful. We just forward the response.
    if (response.data && response.data.status === "success") {
      res.status(200).json({
        status: true,
        message: response.message,
        data: response.data,
      });
    } else {
      // If verification fails, send a client-friendly error
      res.status(400).json({
        status: false,
        message: response.message || "Payment verification failed.",
        data: response.data,
      });
    }
  } catch (err) {
    handleErrorResponse(err, res);
  }
};
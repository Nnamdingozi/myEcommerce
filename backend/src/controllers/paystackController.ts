
import { Request, Response } from 'express';
import { initializeTransaction, verifyTransaction } from '../services/paystackCheckoutService';
import Order from '../database/models/order';
import { PaystackVerificationResponse, PaystackInitializationResponse } from '../interface/Paystack';


export const CreateCheckoutHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = (req.params);
    const numId = Number(orderId)

    if (!orderId) {
     res.status(400).json({ error: 'Order ID is required' });
     return;
    }

    // Initialize transaction
    const response:  PaystackInitializationResponse = await initializeTransaction(numId);

    if (response && response.data) {
      const { authorization_url, reference } = response.data;

      if (!authorization_url || !reference) {
        res
          .status(500)
          .json({ error: "Authorization URL or reference missing from Paystack response" });
          return;
      }

      // Update order with transaction reference
      await Order.update({ transaction_reference: reference }, { where: { id: orderId } });

      res.status(200).json({ authorization_url, reference });
    } else {
    res.status(404).json({ message: 'Data not created or missing in Paystack response' });
    }
  } catch (err: any) {
    console.error("Error initializing Paystack transaction:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
      return;
    }
  }
};

export const verifyCheckoutHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reference } = req.query;
    
    if (!reference || typeof reference !== 'string') {
    res.status(400).json({ error: "Transaction reference is required" });
    return;
    }
    
    // Verify transaction with Paystack
    const response: PaystackVerificationResponse = await verifyTransaction(reference);

    if (response.data && response.data.status === "success") {
      const transactionData = response.data;
      const customerEmail = transactionData.customer.email;
      const transactionMessage = transactionData.gateway_response;
      const paidAt = transactionData.paid_at; 
      
      // Update order status if payment is successful
      await Order.update(
        { payment_status: "paid" },
        { where: { transaction_reference: reference } }
      );
      
      res.status(200).json({
        status: true,
        message: response.message, 
        transaction: {
          reference: transactionData.reference,
          amount: transactionData.amount,
          status: transactionData.status,
          message: transactionMessage,
          customer_email: customerEmail,
          paid_at: paidAt,
        },
      });
    } else {
      res.status(400).json({
        status: false,
        message: response.message || "Payment verification failed",
        data: response.data,
      });
    }
  } catch (err: any) {
    console.error("Error verifying Paystack transaction:", err.message);
    if (!res.headersSent) {
   res.status(500).json({ error: err.message || "Unknown error" });
    }
  }
};

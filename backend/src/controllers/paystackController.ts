
// const { initializeTransaction, verifyTransaction } = require('../services/paystackCheckoutService');
// const { Order } = require('../database/models');

// const CreateCheckoutHandler = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     if (!orderId) {
//       return res.status(400).json({ error: 'Order ID is required' });
//     }

//     // Initialize transaction
//     const response = await initializeTransaction(orderId);

//     if (response && response.data) {
//       const { authorization_url, reference } = response.data;

//       if (!authorization_url || !reference) {
//         return res.status(500).json({ error: "Authorization URL or reference missing from Paystack response" });
//       }

//       // Update order with transaction reference
//       await Order.update({ transaction_reference: reference }, { where: { id: orderId } });

//       return res.status(200).json({ authorization_url, reference });
//     } else {
//       return res.status(404).json({ message: 'Data not created or missing in Paystack response' });
//     }
//   } catch (err) {
//     console.error("Error initializing Paystack transaction:", err.message);
//     if (!res.headersSent) {
//       return res.status(500).json({ error: err.message });
//     }
//   }
// };




// const verifyCheckoutHandler = async (req, res) => {
//   try {
//     const { reference } = req.query;

//     if (!reference) {
//       return res.status(400).json({ error: "Transaction reference is required" });
//     }

//     // Verify transaction with Paystack
//     const response = await verifyTransaction(reference);
//     if (response?.data?.status === true && response?.data?.data?.status === "success") {
//       // Extract transaction details
//       const transactionData = response.data.data;
//       const customerEmail = transactionData.customer?.email;
//       const transactionMessage = transactionData.gateway_response;
//       const paidAt = transactionData.paid_at || null;

//       // Update order status if payment is successful
//       await Order.update(
//         { payment_status: "paid", payment_date: paidAt },
//         { where: { transaction_reference: reference } }
//       );

   

//       return res.status(200).json({
//         status: true,
//         message: response.message, // "Verification successful"
//         transaction: {
//           reference: transactionData.reference,
//           amount: transactionData.amount,
//           status: transactionData.status,
//           message: transactionMessage, // "Successful"
//           customer_email: customerEmail,
//           paid_at: paidAt,
//         },
//       });
//     } else {
//       return res.status(400).json({
//         status: false,
//         message: response?.message || "Payment verification failed",
//         data: response?.data,
//       });
//     }
//   } catch (err) {
//     console.error("Error verifying Paystack transaction:", err.message);
//     if (!res.headersSent) {
//       return res.status(500).json({ error: err.message || "Unknown error" });
//     }
//   }
// };

// module.exports = {
//   CreateCheckoutHandler,
//   verifyCheckoutHandler
// };



// src/controllers/paystackController.ts
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
    
    // Check if the inner data status is "success"
    if (response.data && response.data.status === "success") {
      const transactionData = response.data;
      const customerEmail = transactionData.customer.email;
      const transactionMessage = transactionData.gateway_response;
      const paidAt = transactionData.paid_at; // Already a string, may be null in some cases
      
      // Update order status if payment is successful
      await Order.update(
        { payment_status: "paid" },
        { where: { transaction_reference: reference } }
      );
      
      res.status(200).json({
        status: true,
        message: response.message, // e.g., "Verification successful"
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

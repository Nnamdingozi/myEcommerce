// src/services/paystackService.ts

import axios, { AxiosResponse } from "axios";
import prisma from '../lib/prisma'; // Import our single, shared Prisma client instance
import { PaystackInitResponse , PaystackVerificationData } from "../lib/definition";
import logger from "../lib/logger";

const secretKey = process.env.PAYSTACK_SECRET_KEY;
const baseUrl = "https://api.paystack.co";

if (!secretKey) {
  throw new Error("Paystack secret key is missing in environment variables.");
}

export const initializeTransaction = async (orderId: number, userId: number): Promise<PaystackInitResponse> => {
  try {
    // 1. Fetch the order and its associated user in one query 
    const order = await prisma.order.findUnique({
      where: { 
        id: orderId,
        userId: userId, // Security: Ensure the order belongs to the authenticated user
      },
      include: {
        customer: true, // This fetches the related User record
      },
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found or does not belong to the user.`);
    }

    if (!order.customer) {
      throw new Error(`User associated with Order ID ${orderId} not found.`);
    }
    const callbackUrl = `${process.env.FRONTEND_URL}/checkout/verify`;

    // 2. Make the call to Paystack's API (this logic remains the same)
    const response: AxiosResponse<PaystackInitResponse> = await axios.post(
      `${baseUrl}/transaction/initialize`,
      {
        email: order.customer.email,
        amount: Math.floor(Number(order.totalAmount) * 100), // Convert Decimal to kobo
        callback_url: callbackUrl,
        metadata: {
          orderId: order.id,
          userId: order.customer.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    // 3. Update our order with the transaction reference from Paystack
    await prisma.order.update({
      where: { id: order.id },
      data: { transactionReference: response.data.data.reference },
    });

    return response.data;
  } catch (err: any) {
    // Better error logging for Axios errors
    const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred during Paystack initialization.';
    logger.error("Error initializing Paystack transaction:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const verifyTransaction = async (reference: string): Promise<PaystackVerificationData> => {
  try {
    if (!reference) {
      throw new Error("Transaction reference is required");
    }

    console.log('[STEP 12 - Service]: Calling Paystack API to verify reference:', reference);

    // 1. Call Paystack's API to verify
    const response: AxiosResponse<PaystackVerificationData> = await axios.get(
      `${baseUrl}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
      }
    );
    
    console.log('[STEP 13 - Service]: Received response from Paystack:', response.data);

    // 2. If verification is successful, update our database
    if (response.data?.data?.status === 'success') {

      console.log('[STEP 14 - Service]: Payment was successful. Attempting to update database...');

     
      // use PostgreSQl TO bypass the user's RLS policies.
      await prisma.$executeRaw`SELECT update_order_payment_status(${reference}, 'PAID'::"PaymentStatus")`;

      console.log('[STEP 15 - Service]: Database update successful!');

    } else if (response.data?.data?.status === 'failed') {
      // Optional: Also update the status if the payment explicitly failed.
      await prisma.$executeRaw`SELECT update_order_payment_status(${reference}, 'FAILED'::"PaymentStatus")`;

      console.log('[STEP 15 - Service]: Database update successful!');
      
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred during transaction verification.';
    logger.error("Error verifying transaction:", errorMessage);
    throw new Error(errorMessage);
  }
};
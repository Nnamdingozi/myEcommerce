

import axios, { AxiosResponse } from "axios";
import Order from "../database/models/order";
import User from '../database/models/user';
import { PaystackInitializationResponse, PaystackVerificationResponse } from "../interface/Paystack";

const secretKey: string | undefined = process.env.PAYSTACK_SECRET_KEY;
const baseUrl: string = "https://api.paystack.co";

if (!secretKey) {
  throw new Error("Paystack secret key is missing");
}

export const initializeTransaction = async (orderId: number): Promise<PaystackInitializationResponse> => {
  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) throw new Error(`Order with ID ${orderId} not found.`);

    const user = await User.findOne({ where: { id: order.user_id } });
    if (!user) throw new Error(`User associated with Order ID ${orderId} not found.`);

    const callbackUrl: string = `${process.env.CALLBACK_URL}/orderPages/success`;

    const response: AxiosResponse<PaystackInitializationResponse> = await axios.post(
      `${baseUrl}/transaction/initialize`,
      {
        email: user.email,
        amount: Math.floor(order.total_amount * 100), // Convert to kobo
        callback_url: callbackUrl,
        metadata: {
          orderId: order.id,
          userId: user.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("Error initializing Paystack transaction:", err.message);
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const verifyTransaction = async (reference: string): Promise<PaystackVerificationResponse> => {
  try {
    if (!reference) {
      throw new Error("Transaction reference is required");
    }

    const response: AxiosResponse<PaystackVerificationResponse> = await axios.get(
      `${baseUrl}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
      }
    );

    console.log("Verify payment response:", response.data);

    return response.data; 
  } catch (error: any) {
    console.error("Error verifying transaction:", error.message);

    throw new Error(error.response?.data?.message || error.message);
  }
};

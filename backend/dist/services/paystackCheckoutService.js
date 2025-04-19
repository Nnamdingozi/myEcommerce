"use strict";
// const axios = require('axios');
// const secretKey = process.env.PAYSTACK_SECRET_KEY;
// const baseUrl = 'https://api.paystack.co';
// const {User, Order} = require('../database/models');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransaction = exports.initializeTransaction = void 0;
// const initializeTransaction = async (orderId) => {
//     try {
//         const order = await Order.findOne({ where: { id: orderId } });
//         if (!order) throw new Error(`Order with ID ${orderId} not found.`);
//         const user = await User.findOne({ where: { id: order.user_id } });
//         if (!user) throw new Error(`User associated with Order ID ${orderId} not found.`);
//         const callbackUrl = `${process.env.CALLBACK_URL}/orderPages/success`;
//         const response = await axios.post(
//             `${baseUrl}/transaction/initialize`,
//             {
//                 email: user.email,
//                 amount: Math.floor(order.total_amount * 100), // Convert to kobo
//                 callback_url: callbackUrl,
//                 metadata: {
//                     orderId: order.id,
//                     userId: user.id,
//                 },
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${secretKey}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (err) {
//         console.error('Error initializing Paystack transaction:', err.message);
//         throw new Error(err.response ? err.response.data.message : err.message);
//     }
// };
// const verifyTransaction = async (reference) => {
//   try {
//     if (!reference) {
//       throw new Error("Transaction reference is required");
//     }
//     if (!secretKey) {
//       throw new Error("Paystack secret key is missing");
//     }
//     const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
//       headers: { Authorization: `Bearer ${secretKey}` },
//     });
//     console.log("Verify payment response:", response.data);
//     return {
//       status: response.status,       
//       message: response.data.message, 
//       data: response.data,            
//     };
//   } catch (error) {
//     console.error("Error verifying transaction:", error.message);
//     return {
//       status: error.response ? error.response.status : 500, // Fallback to 500 if no response
//       message: error.message || "An error occurred",
//       data: null, // No data on failure
//     };
//   }
// };
// module.exports = {
//     initializeTransaction,
//     verifyTransaction,
// };
// import axios, { AxiosResponse } from "axios";
// import Order from "../database/models/order";
// import User from '../database/models/user';
// import { PaystackInitializationResponse, PaystackVerificationResponse } from "../interface/Paystack";
// const secretKey: string | undefined = process.env.PAYSTACK_SECRET_KEY;
// const baseUrl: string = "https://api.paystack.co";
// if (!secretKey) {
//   throw new Error("Paystack secret key is missing");
// }
// interface PaystackResponse {
//   status: boolean;
//   message: string;
//   data: {
//     authorization_url: string;
//     access_code: string;
//     reference: string;
//   };
// }
// interface TransactionVerificationResponse {
//   status: number;
//   message: string;
//   data: any;
// }
// export const initializeTransaction = async (orderId: number): Promise<PaystackInitializationResponse> => {
//   try {
//     const order = await Order.findOne({ where: { id: orderId } });
//     if (!order) throw new Error(`Order with ID ${orderId} not found.`);
//     const user = await User.findOne({ where: { id: order.user_id } });
//     if (!user) throw new Error(`User associated with Order ID ${orderId} not found.`);
//     const callbackUrl: string = `${process.env.CALLBACK_URL}/orderPages/success`;
//     const response: AxiosResponse<PaystackInitializationResponse> = await axios.post(
//       `${baseUrl}/transaction/initialize`,
//       {
//         email: user.email,
//         amount: Math.floor(order.total_amount * 100), // Convert to kobo
//         callback_url: callbackUrl,
//         metadata: {
//           orderId: order.id,
//           userId: user.id,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${secretKey}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (err: any) {
//     console.error("Error initializing Paystack transaction:", err.message);
//     throw new Error(err.response ? err.response.data.message : err.message);
//   }
// };
// export const verifyTransaction = async (reference: string): Promise<PaystackVerificationResponse> => {
//   try {
//     if (!reference) {
//       throw new Error("Transaction reference is required");
//     }
//     const response: AxiosResponse<PaystackVerificationResponse> = await axios.get(
//       `${baseUrl}/transaction/verify/${reference}`,
//       {
//         headers: { Authorization: `Bearer ${secretKey}` },
//       }
//     );
//     console.log("Verify payment response:", response.data);
//     return {
//       status: response.status,
//       message: response.data.message,
//       data: response.data,
//     };
//   } catch (error: any) {
//     console.error("Error verifying transaction:", error.message);
//     return {
//       status: error.response ? error.response.status : 500, // Fallback to 500 if no response
//       message: error.message || "An error occurred",
//       data: null,
//     };
//   }
// };
const axios_1 = __importDefault(require("axios"));
const order_1 = __importDefault(require("../database/models/order"));
const user_1 = __importDefault(require("../database/models/user"));
const secretKey = process.env.PAYSTACK_SECRET_KEY;
const baseUrl = "https://api.paystack.co";
if (!secretKey) {
    throw new Error("Paystack secret key is missing");
}
const initializeTransaction = async (orderId) => {
    try {
        const order = await order_1.default.findOne({ where: { id: orderId } });
        if (!order)
            throw new Error(`Order with ID ${orderId} not found.`);
        const user = await user_1.default.findOne({ where: { id: order.user_id } });
        if (!user)
            throw new Error(`User associated with Order ID ${orderId} not found.`);
        const callbackUrl = `${process.env.CALLBACK_URL}/orderPages/success`;
        const response = await axios_1.default.post(`${baseUrl}/transaction/initialize`, {
            email: user.email,
            amount: Math.floor(order.total_amount * 100), // Convert to kobo
            callback_url: callbackUrl,
            metadata: {
                orderId: order.id,
                userId: user.id,
            },
        }, {
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
        });
        return response.data;
    }
    catch (err) {
        console.error("Error initializing Paystack transaction:", err.message);
        throw new Error(err.response?.data?.message || err.message);
    }
};
exports.initializeTransaction = initializeTransaction;
const verifyTransaction = async (reference) => {
    try {
        if (!reference) {
            throw new Error("Transaction reference is required");
        }
        const response = await axios_1.default.get(`${baseUrl}/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${secretKey}` },
        });
        console.log("Verify payment response:", response.data);
        return response.data; // Ensure the return type matches `PaystackVerificationResponse`
    }
    catch (error) {
        console.error("Error verifying transaction:", error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};
exports.verifyTransaction = verifyTransaction;

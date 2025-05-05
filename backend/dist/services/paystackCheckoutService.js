"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransaction = exports.initializeTransaction = void 0;
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
        return response.data;
    }
    catch (error) {
        console.error("Error verifying transaction:", error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};
exports.verifyTransaction = verifyTransaction;

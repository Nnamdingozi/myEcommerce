"use strict";
// const { initializeTransaction, verifyTransaction } = require('../services/paystackCheckoutService');
// const { Order } = require('../database/models');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCheckoutHandler = exports.CreateCheckoutHandler = void 0;
const paystackCheckoutService_1 = require("../services/paystackCheckoutService");
const order_1 = __importDefault(require("../database/models/order"));
const CreateCheckoutHandler = async (req, res) => {
    try {
        const { orderId } = (req.params);
        const numId = Number(orderId);
        if (!orderId) {
            res.status(400).json({ error: 'Order ID is required' });
            return;
        }
        // Initialize transaction
        const response = await (0, paystackCheckoutService_1.initializeTransaction)(numId);
        if (response && response.data) {
            const { authorization_url, reference } = response.data;
            if (!authorization_url || !reference) {
                res
                    .status(500)
                    .json({ error: "Authorization URL or reference missing from Paystack response" });
                return;
            }
            // Update order with transaction reference
            await order_1.default.update({ transaction_reference: reference }, { where: { id: orderId } });
            res.status(200).json({ authorization_url, reference });
        }
        else {
            res.status(404).json({ message: 'Data not created or missing in Paystack response' });
        }
    }
    catch (err) {
        console.error("Error initializing Paystack transaction:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
};
exports.CreateCheckoutHandler = CreateCheckoutHandler;
const verifyCheckoutHandler = async (req, res) => {
    try {
        const { reference } = req.query;
        if (!reference || typeof reference !== 'string') {
            res.status(400).json({ error: "Transaction reference is required" });
            return;
        }
        // Verify transaction with Paystack
        const response = await (0, paystackCheckoutService_1.verifyTransaction)(reference);
        // Check if the inner data status is "success"
        if (response.data && response.data.status === "success") {
            const transactionData = response.data;
            const customerEmail = transactionData.customer.email;
            const transactionMessage = transactionData.gateway_response;
            const paidAt = transactionData.paid_at; // Already a string, may be null in some cases
            // Update order status if payment is successful
            await order_1.default.update({ payment_status: "paid" }, { where: { transaction_reference: reference } });
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
        }
        else {
            res.status(400).json({
                status: false,
                message: response.message || "Payment verification failed",
                data: response.data,
            });
        }
    }
    catch (err) {
        console.error("Error verifying Paystack transaction:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: err.message || "Unknown error" });
        }
    }
};
exports.verifyCheckoutHandler = verifyCheckoutHandler;

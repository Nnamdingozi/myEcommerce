

const { initializeTransaction, verifyTransactionWithRetry } = require('../services/paystackCheckoutService');

const { Order, } = require('../database/models');


const CreateCheckoutHandler = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Initialize transaction
    const response = await initializeTransaction(orderId);

    if (response && response.data) {
      const { authorization_url, reference } = response.data;

      // Ensure both authorization_url and reference are available
      if (!authorization_url || !reference) {
        return res.status(500).json({ error: "Authorization URL or reference missing from Paystack response" });
      }

      // Update order with transaction reference
      await Order.update({ transaction_reference: reference }, { where: { id: orderId } });

      // Return the authorization URL and reference
      return res.status(200).json({ authorization_url, reference });
    } else {
      return res.status(404).json({ message: 'Data not created or missing in Paystack response' });
    }
  } catch (err) {
    console.error("Error initializing Paystack transaction:", err.message); // Log error message
    if (!res.headersSent) {
      return res.status(500).json({ error: err.message }); // Proper error response
    }
  }
};



const verifyCheckoutHandler = async (req, res) => {
  try {
    // Extracting reference from the URL parameters
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({ error: 'Transaction reference is required' });
    }

    // Verify transaction with Paystack
    const response = await verifyTransactionWithRetry(reference);
    const { data } = response;

    if (data.status === 'success') {
      // Update order status if payment is successful
      await Order.update(
        { payment_status: 'paid' },
        { where: { transaction_reference: reference } }
      );

      // Return success response with payment data
      return res.status(200).json({ message: 'Payment successful', data });
    } else {
      // Handle failure in transaction status
      return res.status(404).json({ message: 'Unable to process transaction', data });
    }
  } catch (err) {
    console.error("Error verifying Paystack transaction:", err.message);  // Log error message
    if (!res.headersSent) {
      return res.status(500).json({ error: err.message || 'Unknown error' });  // Ensure fallback error message
    }
  }
};


module.exports = {
  CreateCheckoutHandler,
  verifyCheckoutHandler
};

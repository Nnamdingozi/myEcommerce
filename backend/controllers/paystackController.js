// const { initializeTransaction, verifyTransaction } = require('../services/paystackCheckoutService');

// const { Order, } = require('../database/models');



// const CreateCheckoutHandler = async (req, res) => {
//     try {

//         const { orderId } = req.params;
//         console.log( `orderId in initialize paystack handler: ${orderId}` )
//         const response = await initializeTransaction( orderId);
//         if (response && response.data) {
//             const {authorization_url, reference} = response.data;
//             console.log(`data after initialization in handler authorization url: ${authorization_url}, reference: ${reference}`);
//             console.log(`AuthorizationUrl: ${authorization_url}`);
//             console.log(`Reference: ${reference}`);


//             await Order.update({ transaction_reference: reference }, { where: { id: orderId } });
//             res.status(200).json({
//                 authorization_url,
//                 reference
//             });

//             return response.data
//         } else {
//          res.status(404).json({message: 'data not created'})
//         }


//     } catch (err) {
//         console.error(err.message);
//         if(!res.headersSent)
//        res.status(500).json({ error: err.messsage })

//     }
// };



const { initializeTransaction, verifyTransaction } = require('../services/paystackCheckoutService');

const { Order, } = require('../database/models');


const CreateCheckoutHandler = async (req, res) => {
    try {
        const { orderId } = req.params;
        console.log(`orderId in initialize paystack handler: ${orderId}`);

        // Initialize transaction
        const response = await initializeTransaction(orderId);
        console.log("Paystack response:", response);  // Log full response for debugging

        if (response && response.data) {
            const { authorization_url, reference } = response.data;
            console.log(`Data after initialization in handler - authorization_url: ${authorization_url}, reference: ${reference}`);

            // Ensure both authorization_url and reference are available
            if (!authorization_url || !reference) {
                return res.status(500).json({ error: "Authorization URL or reference missing from Paystack response" });
            }

            // Update order with transaction reference
            await Order.update({ transaction_reference: reference }, { where: { id: orderId } });

            // Return the authorization URL and reference
            res.status(200).json({
                authorization_url,
                reference
            });

            return response.data;
        } else {
            res.status(404).json({ message: 'Data not created or missing in Paystack response' });
        }
    } catch (err) {
        console.error("Error initializing Paystack transaction:", err.message); // Log error message
        if (!res.headersSent) {
            res.status(500).json({ error: err.message }); // Fixed typo here from 'messsage' to 'message'
        }
    }
};

const verifyCheckoutHandler = async (req, res) => {
    try {
        const { reference } = req.query;
        console.log(`Received reference: ${reference}`);

        // Verify transaction with Paystack
        const response = await verifyTransaction(reference);
        const { data } = response;
        console.log(`Received data from Paystack verification: ${data.status}`);

        if (data.status === 'success') {
            // Update order status if payment is successful
            await Order.update({
                payment_status: 'paid'
            }, { where: { transaction_reference: reference } });

            // Return success response with payment data
            res.status(200).json({ message: 'Payment successful', data });
        } else {
            // Handle failure in transaction status
            res.status(404).json({ message: 'Unable to process transaction' });
        }
    } catch (err) {
        console.error("Error verifying Paystack transaction:", err.message);  // Log error message
        if (!res.headersSent) {
            res.status(500).json({ error: err.message });  // Fixed typo here from 'messsage' to 'message'
        }
    }
};

module.exports = {
    CreateCheckoutHandler,
    verifyCheckoutHandler
};

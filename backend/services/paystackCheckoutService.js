// const axios = require('axios');
// const secretKey = process.env.PAYSTACK_SECRET_KEY;
// const baseUrl = 'https://api.paystack.co';
// const {User, Order} = require('../database/models');
// console.log(`Authorization: Bearer ${secretKey}`)

// const initializeTransaction = async (orderId) => {
        
//         try {
//             const order = await Order.findOne({where: 
//                 {id: orderId
//                 }});
//             console.log('order found in initializePaystack service:' ,  order.id)
//             if(!order){
//                 throw new Error('Order not found')
//             } else {
//                 console.log('order found in initializePaystack service:',  order.id);
//                 console.log(`amount from order in initialize paysstack service: ${order.total_amount}`)
//             };

//             const user = await User.findOne({ where: {id: order.user_id}});

//             if(!user){
//                 throw new Error('Oder not found')
//             } else {
//                 console.log('User found in paystack initialization', user.username)
//                 console.log(`user's email: ${user.email}`)
//             };
//             const response = await axios.post(
//                 `${baseUrl}/transaction/initialize`,
//                 {
//                     email: user.email,
//                     amount: Math.floor(order.total_amount * 100), 
//                     callbackUrl: `http://localhost:3000/orderPages/[id]/success?orderId=${orderId}&reference=${reference}`
//                 },
                
//                 {
//                     headers: {
//                         Authorization: `Bearer ${secretKey}`

//                     },
//                 }
//             );
//             console.log('Paystack resopnse in service:', response.data)
           
//             return response.data;

//         } catch (err) {
//             throw new Error(err.response ? err.response.data.message : err.message)
//         }
        
//     };
// const  verifyTransaction = async (reference) => {
   
//         try {
//             const response = await axios.get(`${baseUrl}/transaction/verify/${reference}`, {
//                 headers: {
//                     Authorization: `Bearer ${secretKey}`,
//                 }
//             }
//             );
           
//             return response.data;
//         } catch (err) {
//             throw new Error(err.response ? err.response.data.message : err.message)
//         }
      
//     };



// module.exports = {
//     initializeTransaction,
//     verifyTransaction
// }

// const axios = require('axios');
// const secretKey = process.env.PAYSTACK_SECRET_KEY;
// const baseUrl = 'https://api.paystack.co';
// const { User, Order } = require('../database/models');

// // Log the secret key for debugging (only in development, remove in production)
// if (process.env.NODE_ENV === 'development') {
//     console.log(`Paystack Authorization Key: Bearer ${secretKey}`);
// }

// /**
//  * Initialize a Paystack transaction for the given order ID.
//  * @param {number} orderId - The ID of the order to initialize the transaction for.
//  * @returns {Promise<Object>} The Paystack response data.
//  */
// const initializeTransaction = async (orderId) => {
//     try {
//         // Fetch order by ID
//         const order = await Order.findOne({ where: { id: orderId } });
//         if (!order) throw new Error(`Order with ID ${orderId} not found.`);

//         console.log('Order found for Paystack initialization:', {
//             orderId: order.id,
//             totalAmount: order.total_amount,
//         });

//         // Fetch user associated with the order
//         const user = await User.findOne({ where: { id: order.user_id } });
//         if (!user) throw new Error(`User associated with Order ID ${orderId} not found.`);

//         console.log('User found for Paystack initialization:', {
//             userId: user.id,
//             username: user.username,
//             email: user.email,
//         });

//         // Build payload for Paystack initialization
//         const payload = {
//             email: user.email,
//             amount: Math.floor(order.total_amount * 100), // Convert amount to kobo
//             callback_url: `http://localhost:3000/orderPages/[id]/success?orderId=${orderId}`,
//             metadata: {
//                 orderId: order.id,
//                 userId: user.id,
//             },
//         };

//         console.log('Payload sent to Paystack:', payload);

//         // Send initialization request to Paystack
//         const response = await axios.post(`${baseUrl}/transaction/initialize`, payload, {
//             headers: {
//                 Authorization: `Bearer ${secretKey}`,
//             },
//         });

//         console.log('Paystack response:', response.data);

//         // Return response data
//         return response.data;
//     } catch (err) {
//         console.error('Error initializing Paystack transaction:', err.message);
//         // Provide more detailed error information
//         throw new Error(err.response ? err.response.data.message : err.message);
//     }
// };


const axios = require('axios');
const secretKey = process.env.PAYSTACK_SECRET_KEY;
const baseUrl = 'https://api.paystack.co';
const {User, Order} = require('../database/models');
console.log(`Authorization: Bearer ${secretKey}`)




const initializeTransaction = async (orderId) => {
    try {
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) throw new Error(`Order with ID ${orderId} not found.`);

        const user = await User.findOne({ where: { id: order.user_id } });
        if (!user) throw new Error(`User associated with Order ID ${orderId} not found.`);

        
        const callbackUrl = `${process.env.CALLBACK_URL}/orderPages/success?orderId=${orderId}`;
        console.log(`Callback URL: ${callbackUrl}`); // Log for debugging

        const response = await axios.post(
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

        console.log('Paystack response:', response.data);
        return response.data;
    } catch (err) {
        console.error('Error initializing Paystack transaction:', err.message);
        throw new Error(err.response ? err.response.data.message : err.message);
    }
};




// /**
//  * Verify a Paystack transaction by its reference.
//  * @param {string} reference - The transaction reference from Paystack.
//  * @returns {Promise<Object>} The Paystack verification response data.
//  */
const verifyTransactionWithRetry = async (reference, retries = 5) => {
    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${secretKey}` }
      });
      console.log('Verification response:', response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429 && retries > 0) {
        const retryAfter = error.response.headers['x-ratelimit-reset'] * 1000;  // Get the retry time in milliseconds
        console.error(`Rate limit exceeded. Retrying in ${retryAfter}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter));  // Wait before retrying
        return verifyTransactionWithRetry(reference, retries - 1);  // Retry the request
      }
      console.error('Error verifying transaction:', error.message);
      return null;
    }
  };
  
module.exports = {
    initializeTransaction,
    verifyTransactionWithRetry,
};

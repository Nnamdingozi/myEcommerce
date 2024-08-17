const axios = require('axios');
const secretKey = process.env.PAYSTACK_SECRET_KEY;
const baseUrl = 'https://api.paystack.co';
const {User, Order} = require('../database/models');
console.log(`Authorization: Bearer ${secretKey}`)

const initializeTransaction = async (orderId) => {
        
        try {
            const order = await Order.findOne({where: {id: orderId}});
            if(!order){
                throw new Error('Order not found')
            } else {
                console.log('order found');
                console.log(`amount from order: ${order.total_amount}`)
            };

            const user = await User.findOne({ where: {id: order.user_id}});
            if(!user){
                throw new Error('Oder not found')
            } else {
                console.log('User found')
                console.log(`user's email: ${user.email}`)
            };
            const response = await axios.post(
                `${baseUrl}/transaction/initialize`,
                {
                    email: user.email,
                    amount: Math.floor(order.total_amount * 100), 
                },
                
                {
                    headers: {
                        Authorization: `Bearer ${secretKey}`
                    },
                }
            );
            console.log(response.data)
           
            return response.data;

        } catch (err) {
            throw new Error(err.response ? err.response.data.message : err.message)
        }
        
    };
const  verifyTransaction = async (reference) => {
        try {
            const response = await axios.get(`${baseUrl}/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                }
            }
            );
           
            return response.data;
        } catch (err) {
            throw new Error(err.response ? err.response.data.message : err.message)
        }
      
    };



module.exports = {
    initializeTransaction,
    verifyTransaction
}
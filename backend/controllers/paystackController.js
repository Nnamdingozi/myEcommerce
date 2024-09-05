const { initializeTransaction, verifyTransaction } = require('../services/paystackCheckoutService');

const { Order, } = require('../database/models');



const CreateCheckoutHandler = async (req, res) => {
    try {

        const { id } = req.body;
        const response = await initializeTransaction(id);
        if (response && response.data) {
            const {authorization_url, reference} = response.data;
            console.log(response.data);
            console.log(`AuthorizationUrl: ${authorization_url}`);
            console.log(`Reference: ${reference}`);
            await Order.update({ transaction_reference: reference }, { where: { id } });
            res.status(200).json({
                authorization_url,
                reference
            });

            
        } else {
         res.status(404).json({message: 'data not created'})
        }


    } catch (err) {
        console.error(err.message);
        if(!res.headersSent)
       res.status(500).json({ error: err.messsage })

    }
};

const verifyCheckoutHandler = async (req, res) => {
    try {
        const { reference } = req.query;
        console.log(`Received reference: ${reference}`);
        const response = await verifyTransaction(reference);
      const {data} = response;
      console.log(`Received data ${data.status}`);
        if (data.status === 'success') {
            await Order.update({
                payment_status: 'paid'
            }, { where: { transaction_reference: reference } });
            res.status(200).json({ message: 'payment successful', data });
        } else {
            res.status(404).json({ message: 'Unable to process transaction' })
        }

    } catch (err) {
        res.status(500).json({ error: err.messsage })

    }
};
module.exports = {
    CreateCheckoutHandler,
    verifyCheckoutHandler
}
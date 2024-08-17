const {  CreateCheckoutHandler, verifyCheckoutHandler } = require('../controllers/paystackController');
const express = require('express');

const checkoutRoute = express.Router();

checkoutRoute.post('/', CreateCheckoutHandler);
checkoutRoute.get('/verify',verifyCheckoutHandler);

module.exports = checkoutRoute
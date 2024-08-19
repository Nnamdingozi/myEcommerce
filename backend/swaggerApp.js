const express = require('express');
const userRoute = require('./routes/authRoute');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const checkoutRoute = require('./routes/checkoutRoute');

const app = expres();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/checkout', checkoutRoute);
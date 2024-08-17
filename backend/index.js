'use strict'

require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const {sequelize } = require('./database/models/index')
const userRoutes = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const checkoutRoute = require('./routes/checkoutRoute');
// const passport = require('./database/config/passport');
const passport = require('passport');
const session = require('express-session')
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/checkout',checkoutRoute);
app.use('/payment', checkoutRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // 404 Not Found.
    if (err.status === 404) {
      return res.status(404).send({error: 'Not Found'})
    }
  
    // 500 Internal Server Error (in production, all other errors send this response).
    if (req.app.get('env') !== 'development') {
      return res
        .status(500)
    }
  
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  
    // render the error page
    res.status(err.status || 500)
})

// Start listening.

  app.listen(process.env.PORT, async () => {
    console.log('Server started on http://localhost:3000')
    console.log('Press Ctrl-C to terminate...')
});



module.exports = app
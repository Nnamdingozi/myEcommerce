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
const passport = require('passport');
const initializedPassport = require('./database/config/passport');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
initializedPassport();






const allowedOrigins = ['http://localhost:3000', 'https://myecommerce-frontend.onrender.com'];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is available in the allowedOrigins list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Block request
    }
  },
  credentials: true // Allow credentials such as cookies and auth headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const redisClient = new Redis(process.env.REDIS_URL);


// Set up session middleware with RedisStore
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET, // Secret from your .env file
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/auth', authRoute);
app.use('/images', express.static('public/images'));
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/checkout', checkoutRoute);


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
const PORT = process.env.PORT || 5000;

  app.listen(process.env.PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`)
    console.log('Press Ctrl-C to terminate...')
});



module.exports = app
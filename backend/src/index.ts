// 'use strict'

// require('dotenv').config()

// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const {sequelize } = require('./database/models/index')
// const userRoutes = require('./routes/userRoute');
// const authRoute = require('./routes/authRoute');
// const productRoute = require('./routes/productRoute');
// const cartRoute = require('./routes/cartRoute');
// const orderRoute = require('./routes/orderRoute');
// const checkoutRoute = require('./routes/checkoutRoute');
// const passport = require('./database/config/passport')
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');







// const allowedOrigins = ['http://localhost:3000', 'https://myecommerce-frontend.onrender.com'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Check if the origin is available in the allowedOrigins list
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow request
//     } else {
//       callback(new Error('Not allowed by CORS')); // Block request
//     }
//   },
//   credentials: true // Allow credentials such as cookies and auth headers
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // const redisClient = new Redis(process.env.REDIS_URL);

// app.use(passport.initialize());



// app.use('/users', userRoutes);
// app.use('/auth', authRoute);
// app.use('/images', express.static('public/images'));
// app.use('/product', productRoute);
// app.use('/cart', cartRoute);
// app.use('/order', orderRoute);
// app.use('/checkout', checkoutRoute);


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // 404 Not Found.
//     if (err.status === 404) {
//       return res.status(404).send({error: 'Not Found'})
//     }
  
//     // 500 Internal Server Error (in production, all other errors send this response).
//     if (req.app.get('env') !== 'development') {
//       return res
//         .status(500)
//     }
  
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
  
//     // render the error page
//     res.status(err.status || 500)
// })

// // Start listening.
// const PORT = process.env.PORT || 5000;

//   app.listen(process.env.PORT, async () => {
//     console.log(`Server started on http://localhost:${PORT}`)
//     console.log('Press Ctrl-C to terminate...')
// });



// module.exports = app





// 'use strict'

// require('dotenv').config()

// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const {sequelize } = require('./database/models/index')
// const userRoutes = require('./routes/userRoute');
// const authRoute = require('./routes/authRoute');
// const productRoute = require('./routes/productRoute');
// const cartRoute = require('./routes/cartRoute');
// const orderRoute = require('./routes/orderRoute');
// const checkoutRoute = require('./routes/checkoutRoute');
// const passport = require('./database/config/passport')
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');







// const allowedOrigins = ['http://localhost:3000', 'https://myecommerce-frontend.onrender.com'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Check if the origin is available in the allowedOrigins list
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow request
//     } else {
//       callback(new Error('Not allowed by CORS')); // Block request
//     }
//   },
//   credentials: true // Allow credentials such as cookies and auth headers
// };

// app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // const redisClient = new Redis(process.env.REDIS_URL);

// app.use(passport.initialize());



// app.use('/users', userRoutes);
// app.use('/auth', authRoute);
// app.use('/images', express.static('public/images'));
// app.use('/product', productRoute);
// app.use('/cart', cartRoute);
// app.use('/order', orderRoute);
// app.use('/checkout', checkoutRoute);


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // 404 Not Found.
//     if (err.status === 404) {
//       return res.status(404).send({error: 'Not Found'})
//     }
  
//     // 500 Internal Server Error (in production, all other errors send this response).
//     if (req.app.get('env') !== 'development') {
//       return res
//         .status(500)
//     }
  
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
  
//     // render the error page
//     res.status(err.status || 500)
// })

// // Start listening.
// const PORT = process.env.PORT || 5000;

//   app.listen(process.env.PORT, async () => {
//     console.log(`Server started on http://localhost:${PORT}`)
//     console.log('Press Ctrl-C to terminate...')
// });



// module.exports = app





// index.ts

import dotenv from 'dotenv';
dotenv.config();

import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import './types/express/express-types'; 
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoute';
import cartRouter from './routes/cartRoute';
import orderRouter from './routes/orderRoute';
import checkoutRouter from './routes/checkoutRoute';
import passport from './config/passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './database/models';
console.log('🔌 Models loaded:', Object.keys(db));



const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://myecommerce-frontend.onrender.com'
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials such as cookies and auth headers
};

app.use(cors(corsOptions));

// Use body-parser and built-in express middleware to handle JSON and URL-encoded data.
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize passport middleware.
app.use(passport.initialize());

// Set up routes
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);

// Catch 404 and forward to error handler.
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});




// // Error handler.
// app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
//   // Handle 404 errors.
//   if (err.status === 404) {
//     return res.status(404).send({ error: 'Not Found' });
//   }

//   // In production, do not leak error details.
//   if (req.app.get('env') !== 'development') {
//     return res.status(500).send({ error: 'Internal Server Error' });
//   }

//   // Provide error details in development.
//   res.locals.message = err.message;
//   res.locals.error = err;
//   res.status(err.status || 500).send({ error: err.message });
// });



// Start listening on the defined port.
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log('Press Ctrl-C to terminate...');
});

export default app;

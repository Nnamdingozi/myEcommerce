// src/index.ts

import dotenv from 'dotenv';
dotenv.config(); // Must be at the very top

import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from './config/passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// --- Route Imports ---
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoute';
import cartRouter from './routes/cartRoute';
import orderRouter from './routes/orderRoute';
import checkoutRouter from './routes/paystackCheckoutRoute';

// --- Custom Error Handler ---
import { handleErrorResponse } from './lib/error/handleErrorResponse';

const app = express();

// --- Middleware Setup ---

// CORS configuration 
const allowedOrigins = [
  'http://localhost:3000',
  'https://myecommerce-frontend.onrender.com',
];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Passport middleware for authentication
app.use(passport.initialize());

// --- Static Asset Routes ---
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// --- API Routes ---
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/checkout', checkoutRouter);


// --- Error Handling Middleware ---

// Catch 404 for any routes not handled above
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'The requested resource was not found.'));
});

// ADDED: Global error handler. This will catch all errors passed by `next(err)`
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleErrorResponse(err, res);
});


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
});

export default app;
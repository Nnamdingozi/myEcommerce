
import dotenv from 'dotenv';
dotenv.config();

import createError from 'http-errors';
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
  credentials: true, 
};

app.use(cors(corsOptions));
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



// Start listening on the defined port.
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log('Press Ctrl-C to terminate...');
});

export default app;

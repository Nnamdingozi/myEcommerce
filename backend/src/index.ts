
// import dotenv from 'dotenv';
// dotenv.config();

// import createError from 'http-errors';
// import express, { Request, Response, NextFunction } from 'express';
// import path from 'path';
// import './types/express/express-types'; 
// import userRouter from './routes/userRoute';
// import authRouter from './routes/authRoutes';
// import productRouter from './routes/productRoute';
// import cartRouter from './routes/cartRoute';
// import orderRouter from './routes/orderRoute';
// import checkoutRouter from './routes/checkoutRoute';
// import passport from './config/passport';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import db from './database/models';
// console.log('🔌 Models loaded:', Object.keys(db));



// const app = express();

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://myecommerce-frontend.onrender.com'
// ];

// const corsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {

//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, 
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Initialize passport middleware.
// app.use(passport.initialize());

// // Set up routes
// app.use('/images', express.static(path.join(__dirname, '../public/images')));
// app.use('/product', productRouter);
// app.use('/auth', authRouter);
// app.use('/users', userRouter);
// app.use('/cart', cartRouter);
// app.use('/order', orderRouter);
// app.use('/checkout', checkoutRouter);

// // Catch 404 and forward to error handler.
// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(createError(404));
// });



// // Start listening on the defined port.
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//   console.log(`Server started on http://localhost:${PORT}`);
//   console.log('Press Ctrl-C to terminate...');
// });

// export default app;


// import dotenv from 'dotenv';
// dotenv.config();

// import createError from 'http-errors';
// import express, { Request, Response, NextFunction } from 'express';
// import path from 'path';
// import './types/express/express-types';
// import userRouter from './routes/userRoute';
// import authRouter from './routes/authRoutes';
// import productRouter from './routes/productRoute';
// import cartRouter from './routes/cartRoute';
// import orderRouter from './routes/orderRoute';
// import checkoutRouter from './routes/checkoutRoute';
// import passport from './config/passport';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { Sequelize } from 'sequelize-typescript'; 
// import dbConfig from './config/config';  // 👈 fix this import
// import { Dialect } from 'sequelize';  
// // import * as models from './database/models';  // Import all models via the models index


// const env = process.env.NODE_ENV || 'development';
// const config = dbConfig[env];


// // Initialize Sequelize instance directly in the entry point
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password ?? undefined,
//   {
//     host: config.host,
//     dialect: config.dialect as Dialect,
//     logging: false,
//     models, // Use the models array here
//   }
// );


// // Test the Sequelize connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully!');
//   })
//   .catch((err) => {
//     console.error('Database connection error:', err);
//   });

// const app = express();

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://myecommerce-frontend.onrender.com'
// ];

// const corsOptions = {
//   origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Initialize passport middleware
// app.use(passport.initialize());

// // Set up routes
// app.use('/images', express.static(path.join(__dirname, '../public/images')));
// app.use('/product', productRouter);
// app.use('/auth', authRouter);
// app.use('/users', userRouter);
// app.use('/cart', cartRouter);
// app.use('/order', orderRouter);
// app.use('/checkout', checkoutRouter);

// // Catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(createError(404));
// });

// // Start listening on the defined port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//   console.log(`Server started on http://localhost:${PORT}`);
//   console.log('Press Ctrl-C to terminate...');
// });

// export default app;



// import dotenv from 'dotenv';
// dotenv.config();

// import createError from 'http-errors';
// import express, { Request, Response, NextFunction } from 'express';
// import path from 'path';
// import './types/express/express-types';  // Importing custom types for express (if defined)
// import userRouter from './routes/userRoute';
// import authRouter from './routes/authRoutes';
// import productRouter from './routes/productRoute';
// import cartRouter from './routes/cartRoute';
// import orderRouter from './routes/orderRoute';
// import checkoutRouter from './routes/checkoutRoute';
// import passport from './config/passport';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { Sequelize, } from 'sequelize-typescript';  // Sequelize and sequelize-typescript
// import { Dialect } from 'sequelize';
// import dbConfig from './config/config';  // Configuration import (fixed)
// import { DBConfigs } from './config/config';  // Assuming you've defined the type DBConfig elsewhere
// import * as models from './database/models';  // Importing all models dynamically

// // Environment Configuration
// const env = process.env.NODE_ENV || 'development';

// // Safely access the DBConfig based on the environment and type it
// const config = dbConfig[env as keyof DBConfigs];  // Accessing DB config based on the environment

// // Initialize Sequelize instance
// const sequelize = new Sequelize({
//   database: config.database,
//   username: config.username,
//   password: config.password ?? undefined,
//   host: config.host,
//   dialect: config.dialect as Dialect,
//   logging: false,
//   models: Object.values(models),  // Dynamically load all models from the models directory
// });

// // Test the Sequelize connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully!');
//   })
//   .catch((err) => {
//     console.error('Database connection error:', err);
//   });

// const app = express();

// // CORS configuration
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://myecommerce-frontend.onrender.com',
// ];

// const corsOptions = {
//   origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Initialize passport middleware
// app.use(passport.initialize());

// // Set up routes
// app.use('/images', express.static(path.join(__dirname, '../public/images')));
// app.use('/product', productRouter);
// app.use('/auth', authRouter);
// app.use('/users', userRouter);
// app.use('/cart', cartRouter);
// app.use('/order', orderRouter);
// app.use('/checkout', checkoutRouter);

// // Catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(createError(404));
// });

// // Start listening on the defined port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//   console.log(`Server started on http://localhost:${PORT}`);
//   console.log('Press Ctrl-C to terminate...');
// });

// export default app;


import dotenv from 'dotenv';
dotenv.config();

import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import './types/express/express-types';  // Importing custom types for express (if defined)
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoute';
import cartRouter from './routes/cartRoute';
import orderRouter from './routes/orderRoute';
import checkoutRouter from './routes/checkoutRoute';
import passport from './config/passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import dbConfig, { DBConfigs } from './config/config';  // Importing DBConfigs type and config
import { Dialect } from 'sequelize';  
import * as models from './database/models';  // Importing all models dynamically

// Environment Configuration
const env = process.env.NODE_ENV || 'development';

// Type Narrowing: Check for environment type
const config = dbConfig[env as keyof DBConfigs];

let sequelizeConfig: {
  database: string;
  username: string;
  password?: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
  models: any;
};

if (env === 'production') {
  // Handle production config (use_env_variable, protocol, dialectOptions)
  const productionConfig = config as DBConfigs['production'];
  sequelizeConfig = {
    database: process.env[productionConfig.use_env_variable] || '',
    username: '', // Production may handle this differently
    password: undefined,
    host: '', // Add production host details
    dialect: productionConfig.dialect as Dialect,
    logging: productionConfig.logging,
    models: Object.values(models),  // Dynamically load all models from the models directory
  };
} else {
  // Handle standard config (development and swagger-autogen)
  const standardConfig = config as DBConfigs['development' | 'swagger-autogen'];
  sequelizeConfig = {
    database: standardConfig.database,
    username: standardConfig.username,
    password: standardConfig.password ?? undefined,
    host: standardConfig.host,
    dialect: standardConfig.dialect as Dialect,
    logging: false,
    models: Object.values(models),  // Dynamically load all models from the models directory
  };
}

// Initialize Sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Test the Sequelize connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

const app = express();

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
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize passport middleware
app.use(passport.initialize());

// Set up routes
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Start listening on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log('Press Ctrl-C to terminate...');
});

export default app;

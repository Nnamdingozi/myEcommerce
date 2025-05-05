"use strict";
// import dotenv from 'dotenv';
// dotenv.config();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("./types/express/express-types"); // Importing custom types for express (if defined)
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const checkoutRoute_1 = __importDefault(require("./routes/checkoutRoute"));
const passport_1 = __importDefault(require("./config/passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config/config")); // Importing DBConfigs type and config
const models = __importStar(require("./database/models")); // Importing all models dynamically
// Environment Configuration
const env = process.env.NODE_ENV || 'development';
// Type Narrowing: Check for environment type
const config = config_1.default[env];
let sequelizeConfig;
if (env === 'production') {
    // Handle production config (use_env_variable, protocol, dialectOptions)
    const productionConfig = config;
    sequelizeConfig = {
        database: process.env[productionConfig.use_env_variable] || '',
        username: '', // Production may handle this differently
        password: undefined,
        host: '', // Add production host details
        dialect: productionConfig.dialect,
        logging: productionConfig.logging,
        models: Object.values(models), // Dynamically load all models from the models directory
    };
}
else {
    // Handle standard config (development and swagger-autogen)
    const standardConfig = config;
    sequelizeConfig = {
        database: standardConfig.database,
        username: standardConfig.username,
        password: standardConfig.password ?? undefined,
        host: standardConfig.host,
        dialect: standardConfig.dialect,
        logging: false,
        models: Object.values(models), // Dynamically load all models from the models directory
    };
}
// Initialize Sequelize instance
const sequelize = new sequelize_1.Sequelize(sequelizeConfig);
// Test the Sequelize connection
sequelize.authenticate()
    .then(() => {
    console.log('Database connected successfully!');
})
    .catch((err) => {
    console.error('Database connection error:', err);
});
const app = (0, express_1.default)();
// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://myecommerce-frontend.onrender.com',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Initialize passport middleware
app.use(passport_1.default.initialize());
// Set up routes
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../public/images')));
app.use('/product', productRoute_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoute_1.default);
app.use('/cart', cartRoute_1.default);
app.use('/order', orderRoute_1.default);
app.use('/checkout', checkoutRoute_1.default);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// Start listening on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    console.log('Press Ctrl-C to terminate...');
});
exports.default = app;

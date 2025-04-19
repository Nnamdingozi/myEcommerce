"use strict";
// 'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("./types/express/express-types");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const checkoutRoute_1 = __importDefault(require("./routes/checkoutRoute"));
const passport_1 = __importDefault(require("./config/passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:3000',
    'https://myecommerce-frontend.onrender.com'
];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials such as cookies and auth headers
};
app.use((0, cors_1.default)(corsOptions));
// Use body-parser and built-in express middleware to handle JSON and URL-encoded data.
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Initialize passport middleware.
app.use(passport_1.default.initialize());
// Set up routes.
app.use('/users', userRoute_1.default);
app.use('/auth', authRoutes_1.default);
// Use path.join to correctly locate your static assets (adjust as needed).
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../public/images')));
app.use('/product', productRoute_1.default);
app.use('/cart', cartRoute_1.default);
app.use('/order', orderRoute_1.default);
app.use('/checkout', checkoutRoute_1.default);
// Catch 404 and forward to error handler.
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
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
exports.default = app;

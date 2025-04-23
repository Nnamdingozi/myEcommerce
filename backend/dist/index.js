"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const models_1 = __importDefault(require("./database/models"));
console.log('🔌 Models loaded:', Object.keys(models_1.default));
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
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Initialize passport middleware.
app.use(passport_1.default.initialize());
// Set up routes
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../public/images')));
app.use('/product', productRoute_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoute_1.default);
app.use('/cart', cartRoute_1.default);
app.use('/order', orderRoute_1.default);
app.use('/checkout', checkoutRoute_1.default);
// Catch 404 and forward to error handler.
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// Start listening on the defined port.
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    console.log('Press Ctrl-C to terminate...');
});
exports.default = app;

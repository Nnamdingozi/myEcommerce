"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const user_1 = require("../database/models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        req.user = undefined;
        return next();
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
            const userInstance = await user_1.User.findOne({ where: { id: decoded.id } });
            if (userInstance) {
                req.user = userInstance;
            }
            else {
                req.user = undefined;
            }
        }
        else {
            req.user = undefined;
        }
        next();
    }
    catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;

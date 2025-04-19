"use strict";
// const jwt = require('jsonwebtoken');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
// const authenticate = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     // If no token is present, proceed without attaching user info
//     req.user = null;
//     return next();
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to the request object
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', err.message);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
// module.exports = { authenticate };
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { AuthenticatedRequest } from '../interface/AuthenticateRequest';
// import { IUser } from '../interface/IUser';
// export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     // If no token is present, proceed without attaching user info
//     req.user = undefined;
//     return next();
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     // Ensure decoded is an object and cast it to IUser
//     if (typeof decoded === 'object' && decoded !== null) {
//       req.user = decoded as IUser;
//     } else {
//       req.user = undefined; // If decoded is a string, reset user
//     }
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', (err as Error).message);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { AuthenticatedRequest } from '../interface/AuthenticateRequest';
// import { IUser } from '../interface/IUser';
// import { User } from '../database/models/user'
// export const authenticate = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     req.user = undefined;
//     return next();
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     // Ensure that decoded is an object and contains an 'id'
//     if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
//       // Use the id from the token to fetch the full user record from the database
//       const userInstance = await User.findOne({ where: { id: (decoded as any).id } });
//       if (userInstance) {
//         // Convert the Sequelize instance to a plain object so it matches IUser
//         req.user = userInstance.get({ plain: true }) as IUser;
//       } else {
//         req.user = undefined;
//       }
//     } else {
//       req.user = undefined;
//     }
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', (err as Error).message);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
// middleware/authenticate.ts
// import { Request, Response, NextFunction } from 'express';
// import { UserAttributes } from '../database/models/user';
// import jwt from 'jsonwebtoken';
// // import { AuthenticatedRequest } from '../interface/AuthenticateRequest';
// import { User } from '../database/models/user';
// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     req.user = undefined;
//     return next();
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
//       const userInstance = await User.findOne({ where: { id: (decoded as any).id } });
//       if (userInstance) {
//         req.user = userInstance.get({ plain: true }) as UserAttributes;
//       } else {
//         req.user = undefined;
//       }
//     } else {
//       req.user = undefined;
//     }
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', (err as Error).message);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
const user_1 = require("../database/models/user"); // Assuming you have the User Sequelize model
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
                req.user = userInstance; // Use full Sequelize instance
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

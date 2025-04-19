"use strict";
// const express = require('express');
// const authRouter = express.Router();
// const authController = require('../controllers/authController'); 
// const passport = require('../database/config/passport');
// const { validateLogin, validateRegistration } = require('../middlewares/validationMiddleware');
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     summary: Create a new user
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *               githubId:
//  *                 type: string
//  *               coutry_code:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User created successfully
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// authRouter.post('/register', validateRegistration, authController.register);
// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     summary: Login of registered users
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Successfully logged in a new user
//  *       400:
//  *         description: Bad Request
//  *       500:
//  *         description: Internal Server Error
//  */
// authRouter.post('/login', validateLogin, authController.login);
// /**
//  * @swagger
//  * /auth/github:
//  *   get:
//  *     summary: get user with github id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               githubId:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Successfully registered a new user
//  *       400:
//  *         description: Bad Request
//  *       500:
//  *         description: Internal Server Error
//  */
// authRouter.get('/profile', passport.authenticate('jwt', { session: false }), authController.profile)
// authRouter.get('/github', passport.authenticate('github'));
// authRouter.get('/github/callback', authController.githubCallback);
// // authRouter.get('/google', passport.authenticate('google'));
// // authRouter.get('/google/callback', authController.googleCallback);
// authRouter.get('/me', authController.getMeHandler)
// module.exports = authRouter;
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const passport_1 = __importDefault(require("../config/passport"));
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authRouter = express_1.default.Router();
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               githubId:
 *                 type: string
 *               country_code:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
authRouter.post('/register', validationMiddleware_1.validateRegistration, authController.register);
authRouter.post('/login', validationMiddleware_1.validateLogin, authController.login);
authRouter.get('/profile', passport_1.default.authenticate('jwt', { session: false }), authController.profile);
authRouter.get('/github', passport_1.default.authenticate('github'));
authRouter.get('/github/callback', authController.githubCallback);
authRouter.get('/me', authController.getMeHandler);
exports.default = authRouter;

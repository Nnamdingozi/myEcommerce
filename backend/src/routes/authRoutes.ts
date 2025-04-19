

// const express = require('express');
// const authRouter = express.Router();
// const authController = require('../controllers/authController'); 
// const passport = require('../database/config/passport');
// const { validateLogin, validateRegistration } = require('../middlewares/validationMiddleware');



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



import express, { Router,  RequestHandler } from 'express';
import * as authController from '../controllers/authController';
import passport from '../config/passport';
import { validateLogin, validateRegistration } from '../middlewares/validationMiddleware';

const authRouter: Router = express.Router();

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
authRouter.post('/register', validateRegistration, authController.register);

authRouter.post('/login', validateLogin, authController.login as RequestHandler);

authRouter.get('/profile', passport.authenticate('jwt', { session: false }), authController.profile as RequestHandler);
authRouter.get('/github', passport.authenticate('github'));
authRouter.get('/github/callback', authController.githubCallback as RequestHandler);
authRouter.get('/me', authController.getMeHandler as RequestHandler);

export default authRouter;

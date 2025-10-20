// src/routes/authRouter.ts

import express, { Router } from 'express';
import * as authController from '../controllers/authController';
import passport from '../config/passport'; // Still needed for GitHub strategy
import { validateLogin, validateRegistration } from '../middlewares/validationMiddleware';
// Import your standardized authentication middleware
import { authenticate } from '../middlewares/authMiddleware';

const authRouter: Router = express.Router();

// --- Public Routes ---
// These routes DO NOT use the `authenticate` middleware because the user
// doesn't have a token yet. They are trying to get one.
authRouter.post('/register', validateRegistration, authController.register);
authRouter.post('/login', validateLogin, authController.login);


// --- GitHub OAuth Routes (Special Case) ---
// These use passport.authenticate with a different strategy ('github').
// So, we call it directly here. It's not a JWT authentication.
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get(
  '/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login', session: false }), 
  authController.githubCallback // Your handler runs only on success
);


// --- Protected JWT Routes ---
// These routes require a valid JWT. We can use our clean `authenticate` middleware.
authRouter.get('/profile', authenticate, authController.profile);
authRouter.get('/me', authenticate, authController.getMeHandler);
authRouter.post('/logout', authenticate, authController.logoutHandler);
export default authRouter;
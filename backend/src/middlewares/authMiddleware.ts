// src/middlewares/authMiddleware.ts

import passport from 'passport';

 
export const authenticate = passport.authenticate('jwt', { session: false });
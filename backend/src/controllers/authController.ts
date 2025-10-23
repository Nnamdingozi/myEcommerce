// src/controllers/authController.ts

import { RequestHandler, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import authService from '../services/authService';
import generateToken from '../config/generatejwt-secret';
import { handleErrorResponse } from '../lib/error/handleErrorResponse';

// backend/src/controllers/authController.ts
import { CookieOptions } from 'express';

import { User as PrismaUser } from '@prisma/client';
// Define the shape of our JWT payload for type safety
export interface JwtPayload {
  id: number;
  email: string;
}

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Let's enforce camelCase for the API to match our Prisma schema
    const { username, email, phone, password, countryCode } = req.body;

    if (!username || !email || !phone || !password || !countryCode) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // The input type is now inferred from our service
  const newUser = await authService.register({
      username,
      email,
      phone,
      password,
      countryCode, // This now matches the Prisma schema
    });
    
    // The created user is returned directly, no need for a second DB call.
    const userPayload: JwtPayload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = generateToken(userPayload);
   
const isProduction = process.env.NODE_ENV === 'production';


// 2. Declare the options object with the official type and use `let`.
let cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none', 
  domain: isProduction ? '.onrender.com' : undefined, 
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// 3. In development, we override the settings for localhost HTTP.
if (!isProduction) {
  cookieOptions = {
    ...cookieOptions, 
    secure: false,
    sameSite: 'lax',
    domain: 'localhost', 
  };
}

// 4. Set the cookie in the response using the finalized options object.
res.cookie('token', token, cookieOptions);

    res.status(201).json({
      user: authService.getUserDetails(newUser),
    });
  } catch (error) {
    // All errors (including unique constraint violations) are handled here
    handleErrorResponse(error, res);
  }
};


export const githubCallback: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('github', { failureRedirect: '/login', session: false }, (err: Error, user: PrismaUser) => {
    if (err || !user) {
      return res.redirect('http://localhost:3000/login-failed'); // Redirect to a frontend route
    }
    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = generateToken(payload);
    // Redirect to a frontend route that can store the token
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`); 
  })(req, res, next);
};

export const profile: RequestHandler = (req: Request, res: Response) => {
  // req.user is populated by the 'jwt' strategy with our JwtPayload
  res.json(req.user);
};


export const getMeHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    // 1. The `authenticate` middleware has already done the hard work of finding the user.
    //    We just need to access it from the request object.
    const user = req.user as PrismaUser; // Cast to our known Prisma User type

    if (!user) {
      // --- THIS IS THE FIX ---
      // 1. Send the response without the `return` keyword.
      res.status(401).json({ error: 'Unauthorized: No user found for this session.' });
      // 2. Use a standalone `return;` to exit the function.
      return;
    }

    const userDetails = authService.getUserDetails(user);

    res.status(200).json({ user: userDetails });

  } catch (err) {
    handleErrorResponse(err, res);
  }
};



// backend/src/controllers/authController.ts

// ... in your login handler (and apply the same logic to the register handler)
export const login: RequestHandler = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: Error, user: PrismaUser) => {
    // ... error handling ...
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    
    // Create the JWT as before
    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = generateToken(payload);
    
    const isProduction = process.env.NODE_ENV === 'production';


    // 2. Declare the options object with the official type and use `let`.
    let cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none', 
      domain: isProduction ? '.onrender.com' : undefined, 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    
    // 3. In development, we override the settings for localhost HTTP.
    if (!isProduction) {
      cookieOptions = {
        ...cookieOptions, 
        secure: false,
        sameSite: 'lax',
        domain: 'localhost', 
      };
    }
    
    // 4. Set the cookie in the response using the finalized options object.
    res.cookie('token', token, cookieOptions);
    // Send back only the user data, not the token
    res.status(200).json({
      user: authService.getUserDetails(user),
    });

  })(req, res, next);
};

// Also create a logout handler to clear the cookie
export const logoutHandler: RequestHandler = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
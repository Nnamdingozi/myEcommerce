// src/config/passport.ts

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import dotenv from 'dotenv';
import { Request } from 'express';

// --- Import Prisma Types and Services ---
import { User } from '@prisma/client';
import authService from '../services/authService';
import { getUserByEmail, getUserById } from '../services/userService';
import { JwtPayload } from '../controllers/authController'; // Reuse the payload type

dotenv.config();

// Define the type for the "done" callback for clarity and consistency.
type PassportDoneCallback = (error: any, user?: User | false, options?: { message: string }) => void;

const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

// --- Local Strategy (Email/Password Login) ---
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done: PassportDoneCallback) => {
      try {
        const user: User | null = await getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        if (!user.password) {
          return done(null, false, { message: 'Please log in using the method you originally signed up with.' });
        }

        const isMatch = await authService.comparePassword(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// --- JWT Strategy (For protecting authenticated routes) ---
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET || 'your_default_secret',
    },
    // The type for this 'done' callback can also be `VerifiedCallback` from passport-jwt
    async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user: User | null = await getUserById(jwtPayload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// --- GitHub OAuth Strategy ---
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: `${process.env.BACKEND_URL}/api/auth/github/callback`,
      scope: ['user:email'],
    },
    // FIX: Added the explicit type for the 'done' callback.
    async (accessToken: string, refreshToken: string, profile: Profile, done: PassportDoneCallback) => {
      try {
        const user: User = await authService.findOrCreateUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
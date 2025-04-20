
'use strict';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import authService from '../services/authService';
import { getUserById } from '../services/userService';
import User from 'database/models/user';
dotenv.config();

type VerifyCallback = (error: any, user?: Express.User | false, options?: { message: string }) => void;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: VerifyCallback) => {
      try {
        const user: User | null = await authService.findUserByEmail(email);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        if (!user.password) {
          return done(null, false, { message: 'User has no password set' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user); 
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || '',
    },
    async (jwtPayload: { id: number }, done: VerifyCallback) => {
      if (!jwtPayload?.id) {
        return done(new Error('Invalid token payload'), false);
      }
      try {
        const user: User= await getUserById(jwtPayload.id);
        if (user) {
          return done(null, user); 
        }
        return done(null, false);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: '/auth/github/callback',
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      try {
        const user: User | null = await authService.findOrCreateUser(profile, 'github');
        if (user) {
          return done(null, user); 
        }
        return done(null, false, { message: 'GitHub authentication failed' });
      } catch (err) {
        console.error('Error during GitHub authentication:', err);
        return done(err);
      }
    }
  )
);



export default passport

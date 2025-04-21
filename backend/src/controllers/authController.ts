

import { RequestHandler, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import authService from '../services/authService';
import generateToken from '../config/generatejwt-secret';
import { IUser, ICreateUser, IUserPayload } from '../interface/IUser';
import User from 'database/models/user';

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { username, email, phone, password, country_code } = req.body as {
    username: string;
    email: string;
    phone: string;
    password: string;
    country_code: string;
  };

  if (!username || !email || !phone || !password || !country_code) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const newUser: ICreateUser | null = await authService.register({
      username,
      email,
      phone,
      password,
      country_code,
    });

    if (!newUser) {
      throw new Error('Failed to register new user.');
    }

    const userWithId = await authService.findUserByEmail(newUser.email);
    if (!userWithId) {
      throw new Error('User not found after creation.');
    }

    // Map to IUserPayload
    const userPayload: IUserPayload = {
      id: userWithId.id, // Now the user has an id
      email: userWithId.email,
    };

    const token: string = generateToken(userPayload);
    res.status(201).json({
      token,
      user: userWithId,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate('local', { session: false }, (err: Error, user: Express.User, info: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }


    const authReq = req;
    authReq.logIn(user, { session: false }, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: loginErr.message });
      }

      // Cast user to IUserPayload for token generation
      const payload = user as unknown as IUserPayload;
      const token: string = generateToken(payload);
      res.json({
        token,
        user: payload,
      });
    });
  })(req, res, next);
};

export const githubCallback = (req: Request, res: Response): void => {
  passport.authenticate('github', { failureRedirect: '/login' }, (err: Error | null, user: Express.User | false) => {
    if (err || !user) {
      return res.status(401).json({ error: 'GitHub authentication failed' });
    }

    req.logIn(user, { session: false }, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ error: loginErr.message });
      }

      const payload = user as unknown as IUserPayload;
      const token = generateToken(payload);
      res.redirect(`http://localhost:3000?token=${token}`);
    });
  })(req, res);
};

export const profile: RequestHandler = (req: Request, res: Response): void => {
  const authReq = req;
  if (!authReq.user) {
    res.status(401).json({ error: 'Unauthorized - No user found' });
    return;
  }
  res.json(authReq.user);
};

export const getMeHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {

  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized - No user found' });
      return;
    }
    const fullUser: IUser | null = await authService.findUserById((req.user as User).id);

    if (!fullUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userDetails = authService.getUserDetails(fullUser);
    res.status(200).json({ user: userDetails });
  } catch (err) {
    console.error('Error fetching user details:', (err as Error).message);
    res.status(500).json({ error: (err as Error).message });
  }
};

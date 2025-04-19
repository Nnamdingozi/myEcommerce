// 'use strict';

// const passport = require('passport');
// const authService = require('../services/authService');
// const generateToken = require('../database/config/generatejwt-secret');

// // Register a new user
// exports.register = async (req, res) => {
//   const { username, email, phone, password, country_code } = req.body;

//   if (!username || !email || !phone || !password || !country_code) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const newUser = await authService.register({
//       username,
//       email,
//       phone,
//       password,
//       country_code
//     });

//     if (!newUser || !newUser.id) {
//       throw new Error('Failed to register new user, userId not found.');
//     }

//     const token = generateToken(newUser);
//     res.status(201).json({ token });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Login user
// exports.login = async (req, res, next) => {
//   passport.authenticate('local', { session: false }, (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     if (!user) {
//       return res.status(400).json({ error: info.message });
//     }

//     const token = generateToken(user);
//     res.json({ token });
//   })(req, res, next);
// };

// // Get user profile
// exports.profile = (req, res) => {
//   res.json({
//     id: req.user.id,
//     email: req.user.email,
//     username: req.user.username,
//   });
// };

// // GitHub OAuth callback
// exports.githubCallback = async (req, res, next) => {
//   passport.authenticate('github', (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect('/auth/login'); // Redirect if authentication fails
//     }

//     try {
//       const token = generateToken(user); // Generate JWT
//       res.status(200).json({
//         message: 'GitHub login successful',
//         token,
//         user,
//       });
//     } catch (error) {
//       next(error);
//     }
//   })(req, res, next);
// };

// // Access user credentials from request object
// exports.getMeHandler = (req, res) => {
//   try {
//     const user = authService.getUserDetails(req.user);
//     res.status(200).json({ user });
//   } catch (err) {
//     console.error('Error fetching user details:', err.message);
//     res.status(400).json({ error: err.message });
//   }
// };




// import { RequestHandler, Request, Response, NextFunction } from 'express';
// import passport from 'passport';
// import authService from '../services/authService';
// import generateToken from '../database/config/generatejwt-secret';
// import { IUser } from '../interface/IUser';
// import User from '../database/models/user';



// interface AuthenticatedRequest extends Request {
//   user?: User;
//   logIn: Request['logIn'];  // ✅ Inherits correct type from Passport
//   logOut: Request['logOut'];
//   isAuthenticated: Request['isAuthenticated'];
//   isUnauthenticated: Request['isUnauthenticated'];
// }

// export const register: RequestHandler = async (req, res): Promise<void> => {
//   const { username, email, phone, password, country_code } = req.body as {
//     username: string;
//     email: string;
//     phone: string;
//     password: string;
//     country_code: string;
//   };

//   if (!username || !email || !phone || !password || !country_code) {
//     res.status(400).json({ error: 'Missing required fields' });
//     return;
//   }

//   try {
//     const newUser: IUser | null = await authService.register({
//       username,
//       email,
//       phone,
//       password,
//       country_code,
//     });

//     if (!newUser || !newUser.id) {
//       throw new Error('Failed to register new user, userId not found.');
//     }

//     const token: string = generateToken(newUser);
//     res.status(201).json({ 
//       token, 
//       user: { id: newUser.id, email: newUser.email, username: newUser.username } 
//     });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const login: RequestHandler = async (req, res, next) => {
//   passport.authenticate('local', { session: false }, (err: Error, user: IUser, info: any) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     if (!user) {
//       return res.status(400).json({ error: info.message });
//     }

//     const authReq = req as AuthenticatedRequest; // ✅ Correct type assertion
//     authReq.logIn(user, { session: false }, (loginErr) => {
//       if (loginErr) {
//         return res.status(500).json({ error: loginErr.message });
//       }

//       const token: string = generateToken(user);
//       res.json({
//         token,
//         user: { id: user.id, email: user.email, username: user.username },
//       });
//     });
//   })(req, res, next);
// };


// //  GitHub OAuth Callback
// export const githubCallback = (req: AuthenticatedRequest, res: Response): void => {
//   passport.authenticate('github', { failureRedirect: '/login' }, (err: Error | null, user: IUser | false) => {
//     if (err || !user) {
//       return res.status(401).json({ error: 'GitHub authentication failed' });
//     }

//     req.logIn(user, { session: false }, (loginErr) => {
//       if (loginErr) {
//         return res.status(500).json({ error: loginErr.message });
//       }

//       const token = generateToken(user);
//       res.redirect(`http://localhost:3000?token=${token}`);
//     });
//   })(req, res);
// };

// // Profile Handler
// export const profile: RequestHandler = (req, res): void => {
//   const authReq = req as AuthenticatedRequest;

//   if (!authReq.user) {
//     res.status(401).json({ error: 'Unauthorized - No user found' });
//     return;
//   }

//   res.json({
//     id: authReq.user.id,
//     email: authReq.user.email,
//     username: authReq.user.username,
//   });
// };

// // GetMe Handler
// // export const getMeHandler: RequestHandler = async (req, res): Promise<void> => {
// //   const authReq = req as AuthenticatedRequest;

// //   try {
// //     if (!authReq.user || typeof authReq.user.id !== 'number') {
// //       res.status(401).json({ error: 'Unauthorized - No valid user found' });
// //       return;
// //     }

// //     const user = await authService.getUserDetails(authReq.user.id);
// //     if (!user) {
// //       res.status(404).json({ error: 'User not found' });
// //       return;
// //     }

// //     res.status(200).json({ user });
// //   } catch (err) {
// //     console.error('Error fetching user details:', (err as Error).message);
// //     res.status(500).json({ error: (err as Error).message });
// //   }
// // };


// export const getMeHandler: RequestHandler = async (req, res): Promise<void> => {
//   const authReq = req as AuthenticatedRequest;

//   try {
//     if (!authReq.user) {
//       res.status(401).json({ error: 'Unauthorized - No user found' });
//       return;
//     }

//     // Fetch the full user object first
//     const fullUser = await authService.findUserById(authReq.user.id); // Assuming you have this service method

//     if (!fullUser) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }

//     // Pass the full user object to getUserDetails
//     const userDetails = authService.getUserDetails(fullUser);

//     res.status(200).json({ user: userDetails });
//   } catch (err) {
//     console.error('Error fetching user details:', (err as Error).message);
//     res.status(500).json({ error: (err as Error).message });
//   }
// };

import { RequestHandler, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import authService from '../services/authService';
import generateToken from '../config/generatejwt-secret';
import { IUser, ICreateUser, IUserPayload } from '../interface/IUser';
import { AuthenticatedRequest } from '../interface/AuthenticateRequest';
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
  // Remove the explicit IUser type here; let it be Express.User (which is augmented to IUserPayload)
  passport.authenticate('local', { session: false }, (err: Error, user: Express.User, info: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    // Now user is of type Express.User (augmented to be IUserPayload)
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

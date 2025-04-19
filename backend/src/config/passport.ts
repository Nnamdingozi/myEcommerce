
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
import { IUser } from 'interface/IUser';
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
        return done(null, user); // ✅ Full Sequelize user instance
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
          return done(null, user); // ✅ Full Sequelize user instance
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
          return done(null, user); // ✅ Full Sequelize user instance
        }
        return done(null, false, { message: 'GitHub authentication failed' });
      } catch (err) {
        console.error('Error during GitHub authentication:', err);
        return done(err);
      }
    }
  )
);





// 'use strict';

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import authService from '../services/authService';
// import { getUserById } from '../services/userService';
// import { IUser, IUserPayload } from '../interface/IUser';

// dotenv.config();

// // Define callback types
// type VerifyCallback = (error: any, user?: Express.User | false, options?: { message: string }) => void;
// type SerializeUserCallback = (error: any, id?: number | string) => void;

// /**
//  * Helper function to convert a Sequelize model instance into a plain object
//  * and extract only the minimal payload needed for authentication.
//  */
// const toUserPayload = (user: IUser): IUserPayload => {
//   // Convert the Sequelize model instance to a plain object if possible
//   const plainUser = typeof user.toJSON === 'function' ? user.toJSON() : user;
//   return {
//     id: plainUser.id,
//     email: plainUser.email,
//   };
// };

// // Local Strategy for email and password authentication
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email', passwordField: 'password' },
//     async (email: string, password: string, done: VerifyCallback) => {
//       try {
//         const user: IUser | null = await authService.findUserByEmail(email);
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }
//         if (!user.password) {
//           return done(null, false, { message: 'User has no password set' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: 'Incorrect password' });
//         }
//         // Convert the model to a plain object and extract minimal payload
//         const payload = toUserPayload(user);
//         return done(null, payload as unknown as Express.User);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // JWT Strategy for stateless session management
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET || '',
//     },
//     async (jwtPayload: { id: number }, done: VerifyCallback) => {
//       if (!jwtPayload?.id) {
//         return done(new Error('Invalid token payload'), false);
//       }
//       try {
//         const user: IUser | null = await getUserById(jwtPayload.id);
//         if (user) {
//           const payload = toUserPayload(user);
//           return done(null, payload as unknown as Express.User);
//         }
//         return done(null, false);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID || '',
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
//       callbackURL: '/auth/github/callback',
//     },
//     async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
//       try {
//         const user: IUser | null = await authService.findOrCreateUser(profile, 'github');
//         if (user) {
//           const payload = toUserPayload(user);
//           return done(null, payload as unknown as Express.User);
//         }
//         return done(null, false, { message: 'GitHub authentication failed' });
//       } catch (err) {
//         console.error('Error during GitHub authentication:', err);
//         return done(err);
//       }
//     }
//   )
// );

// // Uncomment the following if you're using sessions for authentication:

// passport.serializeUser((user: Express.User, done: SerializeUserCallback) => {
//   const payload = user as unknown as IUserPayload;
//   if (!payload.id) {
//     return done(new Error('User serialization failed: user object is invalid'));
//   }
//   done(null, payload.id);
// });

// passport.deserializeUser(async (id: number, done: SerializeUserCallback) => {
//   try {
//     const user: IUser | null = await getUserById(id);
//     if (user) {
//       const payload = toUserPayload(user);
//       done(null, payload as unknown as Express.User);
//     } else {
//       done(null, false);
//     }
//   } catch (err) {
//     console.error(`Error during user deserialization: ${err}`);
//     done(err);
//   }
// });

export default passport;
// 'use strict';

// const passport = require('passport');
// const { Strategy: LocalStrategy } = require('passport-local');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GitHubStrategy = require('passport-github2').Strategy;
// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const bcrypt = require('bcryptjs');
// const authService = require('../../services/authService');
// const userService = require('../../services/userService');
// require('dotenv').config();

// // Local Strategy for email and password authentication
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//         },
//         async (email, password, done) => {
//             try {
//                 const user = await authService.findUserByEmail(email);
//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (!isMatch) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // JWT Strategy for stateless session management
// passport.use(
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.JWT_SECRET,
//         },
//         async (jwtPayload, done) => {
//             // Check if the payload contains a valid id
//             if (!jwtPayload || !jwtPayload.id) {
//                 return done(new Error('Invalid token payload'), false);
//             }

//             try {
//                 // Fetch the user by id from the userService
//                 const user = await userService.getUserById(jwtPayload.id);

//                 if (user) {
//                     // If the user exists, pass the user to the next middleware
//                     return done(null, user);
//                 } else {
//                     return done(null, false);
//                 }
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET,
//             callbackURL: '/auth/github/callback',
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const user = await authService.findOrCreateUser(profile, 'github');
//                 return done(null, user);
//             } catch (err) {
//                 console.error('Error during GitHub authentication:', err);
//                 return done(err);
//             }
//         }
//     )
// );


// // Google Strategy for OAuth authentication
// // passport.use(new GoogleStrategy({
// //     clientID: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
// //     clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google client secret
// //     callbackURL: '/auth/google/callback', // Redirect URI after Google authentication
// //   },
// //   async (accessToken, refreshToken, profile, done) => {
// //     try {
// //       // Check if the user exists in your database
// //       const user = await authService.findOrCreateUser(profile, 'google');
// //       return done(null, user); // Pass user to the next middleware
// //     } catch (err) {
// //       console.error('Error during Google authentication:', err);
// //       return done(err);
// //     }
// //   }
// // ));


// // // Serialize user for session management
// // passport.serializeUser((user, done) => {
// //   if (!user || !user.id) {
// //     return done(new Error('User serialization failed: user object is invalid'));
// //   }
// //   done(null, user.id);
// // });

// // // Deserialize user to retrieve user details from session
// // passport.deserializeUser(async (id, done) => {
// //   try {
// //     const user = await userService.getUserById(id);
// //     done(null, user);
// //   } catch (err) {
// //     console.error(`Error during user deserialization: ${err}`);
// //     done(err);
// //   }
// // });

// module.exports = passport;


// import passport from 'passport';
// import { Strategy as LocalStrategy, IStrategyOptions as LocalStrategyOptions } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions as JwtStrategyOptions } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// // import GoogleStrategy from 'passport-google-oauth20'; // Uncomment if needed
// import bcrypt from 'bcryptjs';
// import * as authService from '../../services/authService';
// import * as userService from '../../services/userService';
// import dotenv from 'dotenv';

// dotenv.config();

// // Define an interface for your JWT payload. Adjust as needed.
// interface JwtPayload {
//   id: string;
//   [key: string]: any;
// }

// // Local Strategy for email and password authentication
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//     } as LocalStrategyOptions,
//     async (
//       email: string,
//       password: string,
//       done: (error: any, user?: any, options?: { message: string }) => void
//     ) => {
//       try {
//         const user = await authService.findUserByEmail(email);
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: 'Incorrect password' });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // JWT Strategy for stateless session management
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET as string,
//     } as JwtStrategyOptions,
//     async (
//       jwtPayload: JwtPayload,
//       done: (error: any, user?: any, info?: any) => void
//     ) => {
//       // Check if the payload contains a valid id
//       if (!jwtPayload || !jwtPayload.id) {
//         return done(new Error('Invalid token payload'), false);
//       }

//       try {
//         // Fetch the user by id from the userService
//         const user = await userService.getUserById(jwtPayload.id);

//         if (user) {
//           // If the user exists, pass the user to the next middleware
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//       callbackURL: '/auth/github/callback',
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: (error: any, user?: any) => void
//     ) => {
//       try {
//         const user = await authService.findOrCreateUser(profile, 'github');
//         return done(null, user);
//       } catch (err) {
//         console.error('Error during GitHub authentication:', err);
//         return done(err);
//       }
//     }
//   )
// );

// // Google Strategy for OAuth authentication (commented out; uncomment if needed)
// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: process.env.GOOGLE_CLIENT_ID as string,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// //       callbackURL: '/auth/google/callback',
// //     },
// //     async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
// //       try {
// //         const user = await authService.findOrCreateUser(profile, 'google');
// //         return done(null, user);
// //       } catch (err) {
// //         console.error('Error during Google authentication:', err);
// //         return done(err);
// //       }
// //     }
// //   )
// // );

// export default passport;


// 'use strict';

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import authService from '../../services/authService';
// import { getUserById } from '../../services/userService';
// import { IUser } from '../../interface/IUser';

// dotenv.config();

// // Local Strategy for email and password authentication
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//         },
//         async (email: string, password: string, done) => {
//             try {
//                 const user: IUser | null = await authService.findUserByEmail(email);
//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (!isMatch) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }

//                 return done(null, user);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // JWT Strategy for stateless session management
// passport.use(
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.JWT_SECRET as string,
//         },
//         async (jwtPayload: { id: number }, done) => {
//             if (!jwtPayload || !jwtPayload.id) {
//                 return done(new Error('Invalid token payload'), false);
//             }

//             try {
//                 const user: IUser | null = await getUserById(jwtPayload.id);
//                 if (user) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false);
//                 }
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID as string,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//             callbackURL: '/auth/github/callback',
//         },
//         async (accessToken: string, refreshToken: string, profile: any, done) => {
//             try {
//                 const user: IUser | null = await authService.findOrCreateUser(profile, 'github');
//                 return done(null, user);
//             } catch (err) {
//                 console.error('Error during GitHub authentication:', err);
//                 return done(err);
//             }
//         }
//     )
// );

// // Serialize user for session management
// passport.serializeUser((user: IUser, done) => {
//     if (!user || !user.id) {
//         return done(new Error('User serialization failed: user object is invalid'));
//     }
//     done(null, user.id);
// });

// // Deserialize user to retrieve user details from session
// passport.deserializeUser(async (id: number, done) => {
//     try {
//         const user: IUser | null = await getUserById(id);
//         done(null, user);
//     } catch (err) {
//         console.error(`Error during user deserialization: ${err}`);
//         done(err);
//     }
// });

// export default passport;



// 'use strict';

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import authService from '../../services/authService';
// import { getUserById } from '../../services/userService';
// import { IUser } from '../../interface/IUser';

// dotenv.config();

// // Local Strategy for email and password authentication
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//         },
//         async (email: string, password: string, done) => {
//             try {
//                 const user = await authService.findUserByEmail(email);
                
//                 if (!user || !user.password) {
//                     return done(null, false, { message: 'User not found or missing password' });
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password as string);
//                 if (!isMatch) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }

//                 return done(null, user as Express.User);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // JWT Strategy for stateless session management
// passport.use(
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.JWT_SECRET || '',
//         },
//         async (jwtPayload: { id: number }, done) => {
//             if (!jwtPayload || !jwtPayload.id) {
//                 return done(new Error('Invalid token payload'), false);
//             }

//             try {
//                 const user = await getUserById(jwtPayload.id);
//                 return user ? done(null, user as Express.User) : done(null, false);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID || '',
//             clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
//             callbackURL: '/auth/github/callback',
//         },
//         async (accessToken: string, refreshToken: string, profile: any, done) => {
//             try {
//                 const user = await authService.findOrCreateUser(profile, 'github');
//                 return done(null, user as Express.User);
//             } catch (err) {
//                 console.error('Error during GitHub authentication:', err);
//                 return done(err);
//             }
//         }
//     )
// );

// // Serialize user for session management
// passport.serializeUser((user, done) => {
//     if (!user || !(user as IUser).id) {
//         return done(new Error('User serialization failed: user object is invalid'));
//     }
//     done(null, (user as IUser).id);
// });

// // Deserialize user to retrieve user details from session
// passport.deserializeUser(async (id: number, done) => {
//     try {
//         const user = await getUserById(id);
//         done(null, user as Express.User);
//     } catch (err) {
//         console.error(`Error during user deserialization: ${err}`);
//         done(err);
//     }
// });

// export default passport;











// 'use strict';


// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import authService from '../../services/authService';
// import { getUserById } from '../../services/userService';
// import { IUser } from '../../interface/IUser';

// dotenv.config();

// type DoneCallback = (error: any, user?: Express.User | false, options?: { message: string }) => void;

// // Local Strategy for email and password authentication
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//         },
//         async (email: string, password: string, done: DoneCallback) => {
//             try {
//                 const user: IUser | null = await authService.findUserByEmail(email);
//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 if (!user.password) {
//                     return done(null, false, { message: 'User has no password set' });
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password);
//                 if (!isMatch) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }

//                 return done(null, user as Express.User);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // JWT Strategy for stateless session management
// passport.use(
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.JWT_SECRET || '',
//         },
//         async (jwtPayload: { id: number }, done: DoneCallback) => {
//             if (!jwtPayload?.id) {
//                 return done(new Error('Invalid token payload'), false);
//             }

//             try {
//                 const user: IUser | null = await getUserById(jwtPayload.id);
//                 return user ? done(null, user as Express.User) : done(null, false);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID || '',
//             clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
//             callbackURL: '/auth/github/callback',
//         },
//         async (accessToken: string, refreshToken: string, profile: any, done: DoneCallback ) => {
//             try {
//                 const user: IUser | null = await authService.findOrCreateUser(profile, 'github');
//                 return done(null, user as Express.User);
//             } catch (err) {
//                 console.error('Error during GitHub authentication:', err);
//                 return done(err);
//             }
//         }
//     )
// );

// // Serialize user for session management
// passport.serializeUser((user: Express.User, done: DoneCallback) => {
//     if (!(user as IUser).id) {
//         return done(new Error('User serialization failed: user object is invalid'));
//     }
//     done(null, (user as IUser).id);
// });

// // Deserialize user to retrieve user details from session
// passport.deserializeUser(async (id: number, done: DoneCallback) => {
//     try {
//         const user: IUser | null = await getUserById(id);
//         done(null, user as Express.User);
//     } catch (err) {
//         console.error(`Error during user deserialization: ${err}`);
//         done(err);
//     }
// });

// export default passport;




// 'use strict';

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import authService from '../../services/authService';
// import { getUserById } from '../../services/userService';
// import { IUser } from '../../interface/IUser';

// dotenv.config();

// // Callback type for verification strategies (e.g. Local, JWT, GitHub)
// type VerifyCallback = (error: any, user?: Express.User | false, options?: { message: string }) => void;

// // Callback type for session serialization/deserialization
// type SerializeUserCallback = (error: any, id?: number | string) => void;

// // Local Strategy for email and password authentication
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//         },
//         async (email: string, password: string, done: VerifyCallback) => {
//             try {
//                 const user: IUser | null = await authService.findUserByEmail(email);
//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 if (!user.password) {
//                     return done(null, false, { message: 'User has no password set' });
//                 }

//                 const isMatch = await bcrypt.compare(password, user.password as string);
//                 if (!isMatch) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }

//                 return done(null, user as Express.User);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // JWT Strategy for stateless session management
// passport.use(
//     new JwtStrategy(
//         {
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: process.env.JWT_SECRET || '',
//         },
//         async (jwtPayload: { id: number }, done: VerifyCallback) => {
//             if (!jwtPayload?.id) {
//                 return done(new Error('Invalid token payload'), false);
//             }

//             try {
//                 const user: IUser | null = await getUserById(jwtPayload.id);
//                 return user ? done(null, user as Express.User) : done(null, false);
//             } catch (error) {
//                 return done(error);
//             }
//         }
//     )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID || '',
//             clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
//             callbackURL: '/auth/github/callback',
//         },
//         async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
//             try {
//                 const user: IUser | null = await authService.findOrCreateUser(profile, 'github');
//                 return done(null, user as Express.User);
//             } catch (err) {
//                 console.error('Error during GitHub authentication:', err);
//                 return done(err);
//             }
//         }
//     )
// );

// // Serialize user for session management
// passport.serializeUser((user: Express.User, done: SerializeUserCallback) => {
//     if (!(user as IUser).id) {
//         return done(new Error('User serialization failed: user object is invalid'));
//     }
//     done(null, (user as IUser).id);
// });

// // Deserialize user to retrieve user details from session
// passport.deserializeUser(async (id: number, done: SerializeUserCallback) => {
//     try {
//         const user: IUser | null = await getUserById(id);
//         done(null, user as Express.User);
//     } catch (err) {
//         console.error(`Error during user deserialization: ${err}`);
//         done(err);
//     }
// });

// export default passport;




// 'use strict';

// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// import authService from '../services/authService';
// import { getUserById } from '../services/userService';
// import { IUser, IUserPayload } from '../interface/IUser';

// dotenv.config();

// // Define callback types
// type VerifyCallback = (error: any, user?: Express.User | false, options?: { message: string }) => void;
// type SerializeUserCallback = (error: any, id?: number | string) => void;

// /**
//  * Helper function to convert a Sequelize model instance into a plain object
//  * and extract only the minimal payload needed for authentication.
//  */
// const toUserPayload = (user: any): IUserPayload => {
//   // Convert the Sequelize model instance to a plain object if possible
//   const plainUser = typeof user.toJSON === 'function' ? user.toJSON() : user;
//   return {
//     id: plainUser.id,
//     email: plainUser.email,
//   };
// };

// // Local Strategy for email and password authentication
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email', passwordField: 'password' },
//     async (email: string, password: string, done: VerifyCallback) => {
//       try {
//         const user: IUser | null = await authService.findUserByEmail(email);
//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }
//         if (!user.password) {
//           return done(null, false, { message: 'User has no password set' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: 'Incorrect password' });
//         }
//         // Convert the model to a plain object and extract minimal payload
//         const payload = toUserPayload(user);
//         return done(null, payload as unknown as Express.User);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // JWT Strategy for stateless session management
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET || '',
//     },
//     async (jwtPayload: { id: number }, done: VerifyCallback) => {
//       if (!jwtPayload?.id) {
//         return done(new Error('Invalid token payload'), false);
//       }
//       try {
//         const user: IUser | null = await getUserById(jwtPayload.id);
//         if (user) {
//           const payload = toUserPayload(user);
//           return done(null, payload as unknown as Express.User);
//         }
//         return done(null, false);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // GitHub Strategy for OAuth authentication
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID || '',
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
//       callbackURL: '/auth/github/callback',
//     },
//     async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
//       try {
//         const user: IUser | null = await authService.findOrCreateUser(profile, 'github');
//         if (user) {
//           const payload = toUserPayload(user);
//           return done(null, payload as unknown as Express.User);
//         }
//         return done(null, false, { message: 'GitHub authentication failed' });
//       } catch (err) {
//         console.error('Error during GitHub authentication:', err);
//         return done(err);
//       }
//     }
//   )
// );

// // Uncomment the following if you're using sessions for authentication:

// // passport.serializeUser((user: Express.User, done: SerializeUserCallback) => {
// //   const payload = user as unknown as IUserPayload;
// //   if (!payload.id) {
// //     return done(new Error('User serialization failed: user object is invalid'));
// //   }
// //   done(null, payload.id);
// // });

// // passport.deserializeUser(async (id: number, done: SerializeUserCallback) => {
// //   try {
// //     const user: IUser | null = await getUserById(id);
// //     if (user) {
// //       const payload = toUserPayload(user);
// //       done(null, payload as unknown as Express.User);
// //     } else {
// //       done(null, false);
// //     }
// //   } catch (err) {
// //     console.error(`Error during user deserialization: ${err}`);
// //     done(err);
// //   }
// // });

// export default passport;



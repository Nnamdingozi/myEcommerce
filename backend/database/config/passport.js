'use strict';

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const authService = require('../../services/authService');
const userService = require('../../services/userService');
require('dotenv').config();

// Local Strategy for email and password authentication
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await authService.findUserByEmail(email);
                if (!user) {
                    return done(null, false, { message: 'User not found' });
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

// JWT Strategy for stateless session management
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            // Check if the payload contains a valid id
            if (!jwtPayload || !jwtPayload.id) {
                return done(new Error('Invalid token payload'), false);
            }

            try {
                // Fetch the user by id from the userService
                const user = await userService.getUserById(jwtPayload.id);

                if (user) {
                    // If the user exists, pass the user to the next middleware
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

// GitHub Strategy for OAuth authentication
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/auth/github/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await authService.findOrCreateUser(profile, 'github');
                return done(null, user);
            } catch (err) {
                console.error('Error during GitHub authentication:', err);
                return done(err);
            }
        }
    )
);


// Google Strategy for OAuth authentication
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google client secret
//     callbackURL: '/auth/google/callback', // Redirect URI after Google authentication
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       // Check if the user exists in your database
//       const user = await authService.findOrCreateUser(profile, 'google');
//       return done(null, user); // Pass user to the next middleware
//     } catch (err) {
//       console.error('Error during Google authentication:', err);
//       return done(err);
//     }
//   }
// ));


// // Serialize user for session management
// passport.serializeUser((user, done) => {
//   if (!user || !user.id) {
//     return done(new Error('User serialization failed: user object is invalid'));
//   }
//   done(null, user.id);
// });

// // Deserialize user to retrieve user details from session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userService.getUserById(id);
//     done(null, user);
//   } catch (err) {
//     console.error(`Error during user deserialization: ${err}`);
//     done(err);
//   }
// });

module.exports = passport;

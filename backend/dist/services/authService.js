"use strict";
// import bcrypt from 'bcryptjs';
// import  User from '../database/models'; // Ensure your User model is properly typed
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.findOrCreateUser = exports.comparePassword = exports.findUserById = exports.findUserByEmail = exports.register = void 0;
// // Interfaces for type checking
// export interface IRegisterInput {
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   country_code: string;
// }
// export interface IUser {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   country_code: string;
//   // Allow additional properties (e.g., provider-specific IDs)
//   [key: string]: any;
// }
// export interface IUserProfile {
//   id: string;
//   emails?: { value: string }[];
//   username?: string;
//   displayName?: string;
//   [key: string]: any;
// }
// // Register a new user
// export const register = async ({
//   username,
//   email,
//   phone,
//   password,
//   country_code,
// }: IRegisterInput): Promise<IUser> => {
//   try {
//     const hashedPassword: string = await bcrypt.hash(password, 10);
//     const newUser: IUser = await User.create({
//       username,
//       email,
//       phone,
//       password: hashedPassword,
//       country_code,
//     });
//     if (!newUser) {
//       throw new Error(
//         'User creation failed, no user returned from the database.'
//       );
//     }
//     return newUser;
//   } catch (error: any) {
//     if (error.name === 'SequelizeValidationError') {
//       console.error('Validation error:', error.errors);
//       throw new Error(
//         'Validation error: ' +
//           error.errors.map((e: any) => e.message).join(', ')
//       );
//     } else {
//       console.error('Error during user registration:', error);
//       throw new Error('User registration failed.');
//     }
//   }
// };
// // Function to find a user by email
// export const findUserByEmail = async (email: string): Promise<IUser | null> => {
//   try {
//     return await User.findOne({ where: { email } });
//   } catch (error: any) {
//     throw new Error('Error finding user by email: ' + error.message);
//   }
// };
// // Function to compare a plain password with a hashed password
// export const comparePassword = async (
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> => {
//   try {
//     return await bcrypt.compare(password, hashedPassword);
//   } catch (error: any) {
//     throw new Error('Error comparing passwords: ' + error.message);
//   }
// };
// // Function to find an existing user or create a new one based on a provider profile
// export const findOrCreateUser = async (
//   profile: IUserProfile,
//   provider: string
// ): Promise<IUser> => {
//   try {
//     const whereClause = { [`${provider}Id`]: profile.id };
//     // Step 1: Check if a user exists with the provider-specific ID
//     let user: IUser | null = await User.findOne({ where: whereClause });
//     if (!user) {
//       // Step 2: Handle missing email
//       const email: string =
//         profile.emails?.[0]?.value ||
//         `${profile.username || 'githubUser'}-${profile.id}@placeholder.com`;
//       const phoneNumber: string = '09000000000';
//       // Step 3: Create a new user if none exists
//       user = await User.create({
//         username: profile.displayName || profile.username || 'GitHubUser',
//         email: email,
//         phone: phoneNumber,
//         password: await bcrypt.hash(
//           Math.random().toString(36).slice(-8),
//           10
//         ),
//         country_code: '+234',
//         [`${provider}Id`]: profile.id,
//       });
//     }
//     return user;
//   } catch (error: any) {
//     throw new Error('Error finding or creating user: ' + error.message);
//   }
// };
// // Function to get a subset of user details
// export const getUserDetails = (
//   user: IUser
// ): { id: number; username: string; email: string } => {
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return {
//     id: user.id,
//     username: user.username,
//     email: user.email,
//   };
// };
// import bcrypt from 'bcryptjs';
// import  User  from '../database/models/user'; // Ensure User model is correctly imported
// import { InferAttributes, InferCreationAttributes } from 'sequelize';
// import { IUser } from '../interface/IUser';
// // Interfaces for type safety
// export interface IRegisterInput {
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   country_code: string;
// }
// export interface IUserAttributes extends InferAttributes<IUser>, InferCreationAttributes<IUser> {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   password: string;
//   country_code: string;
//   [key: string]: any;
// }
// export interface IUserProfile {
//   id: string;
//   emails?: { value: string }[];
//   username?: string;
//   displayName?: string;
//   [key: string]: any;
// }
// // Register a new user
// export const register = async (input: IRegisterInput): Promise<IUser> => {
//   try {
//     const hashedPassword = await bcrypt.hash(input.password, 10);
//     return await User.create({
//       username: input.username,
//       email: input.email,
//       phone: input.phone,
//       password: hashedPassword,
//       country_code: input.country_code,
//     });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     throw new Error('User registration failed.');
//   }
// };
// // Find user by email
// export const findUserByEmail = async (email: string): Promise<IUser | null> => {
//   try {
//     return await User.findOne({ where: { email } });
//   } catch (error) {
//     console.error('Error finding user by email:', error);
//     throw new Error('Error finding user.');
//   }
// };
// // Compare plain password with hashed password
// export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
//   try {
//     return await bcrypt.compare(password, hashedPassword);
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     throw new Error('Error comparing passwords.');
//   }
// };
// // Find or create a user based on OAuth profile
// export const findOrCreateUser = async (profile: IUserProfile, provider: string): Promise<User> => {
//   try {
//     const whereClause = { [`${provider}Id`]: profile.id };
//     let user = await User.findOne({ where: whereClause });
//     if (!user) {
//       const email = profile.emails?.[0]?.value || `${profile.username || 'user'}-${profile.id}@placeholder.com`;
//       const phoneNumber = '09000000000';
//       user = await User.create({
//         username: profile.displayName || profile.username || 'OAuthUser',
//         email,
//         phone: phoneNumber,
//         password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
//         country_code: '+234',
//         [`${provider}Id`]: profile.id,
//       });
//     }
//     return user;
//   } catch (error) {
//     console.error('Error finding or creating user:', error);
//     throw new Error('Error finding or creating user.');
//   }
// };
// // Get limited user details (safe to return)
// export const getUserDetails = (user: IUser): { id: number; username: string; email: string } => {
//   if (!user) {
//     throw new Error('User not found');
//   }
//   return {
//     id: user.id,
//     username: user.username,
//     email: user.email,
//   };
// };
// export const findUserById = async (userId: number): Promise<IUser | null> => {
//   return await User.findByPk(userId); // Assuming you're using Sequelize
// };
// const authService = {
//   register,
//   findUserByEmail,
//   comparePassword,
//   findOrCreateUser,
//   getUserDetails,
//   findUserById
// };
// export default authService;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../database/models/user"));
// Register a new user
const register = async (input) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(input.password, 10);
        const user = await user_1.default.create({
            username: input.username,
            email: input.email,
            phone: input.phone,
            password: hashedPassword,
            country_code: input.country_code,
        });
        return user.get({ plain: true });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        throw new Error('User registration failed.');
    }
};
exports.register = register;
// Find user by email
const findUserByEmail = async (email) => {
    try {
        const user = await user_1.default.findOne({ where: { email } });
        return user ? user.get({ plain: true }) : null;
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Error finding user.');
    }
};
exports.findUserByEmail = findUserByEmail;
// Find user by ID
const findUserById = async (userId) => {
    try {
        const user = await user_1.default.findByPk(userId);
        return user ? user.get({ plain: true }) : null;
    }
    catch (error) {
        console.error('Error finding user by ID:', error);
        throw new Error('Error finding user.');
    }
};
exports.findUserById = findUserById;
// Compare plain password with hashed password
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcryptjs_1.default.compare(password, hashedPassword);
    }
    catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords.');
    }
};
exports.comparePassword = comparePassword;
// Find or create a user based on OAuth profile
const findOrCreateUser = async (profile, provider) => {
    try {
        const whereClause = { [`${provider}Id`]: profile.id };
        let user = await user_1.default.findOne({ where: whereClause });
        if (!user) {
            const email = profile.emails?.[0]?.value || `${profile.username || 'user'}-${profile.id}@placeholder.com`;
            const phoneNumber = '09000000000';
            user = await user_1.default.create({
                username: profile.displayName || profile.username || 'OAuthUser',
                email,
                phone: phoneNumber,
                password: await bcryptjs_1.default.hash(Math.random().toString(36).slice(-8), 10),
                country_code: '+234',
                [`${provider}Id`]: profile.id,
            });
        }
        return user.get({ plain: true });
    }
    catch (error) {
        console.error('Error finding or creating user:', error);
        throw new Error('Error finding or creating user.');
    }
};
exports.findOrCreateUser = findOrCreateUser;
// Get limited user details (safe to return)
const getUserDetails = (user) => {
    if (!user) {
        throw new Error('User not found');
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
};
exports.getUserDetails = getUserDetails;
const authService = {
    register: exports.register,
    findUserByEmail: exports.findUserByEmail,
    comparePassword: exports.comparePassword,
    findOrCreateUser: exports.findOrCreateUser,
    getUserDetails: exports.getUserDetails,
    findUserById: exports.findUserById,
};
exports.default = authService;

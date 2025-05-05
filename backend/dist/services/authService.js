"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.findOrCreateUser = exports.comparePassword = exports.findUserById = exports.findUserByEmail = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../database/models/user"));
const userService_1 = require("./userService");
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
        const user = await (0, userService_1.getUserByEmail)(email);
        return user;
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
        return user;
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

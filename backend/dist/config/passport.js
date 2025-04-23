'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const passport_github2_1 = require("passport-github2");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const authService_1 = __importDefault(require("../services/authService"));
const userService_1 = require("../services/userService");
dotenv_1.default.config();
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
        const user = await authService_1.default.findUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (!user.password) {
            return done(null, false, { message: 'User has no password set' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || '',
}, async (jwtPayload, done) => {
    if (!jwtPayload?.id) {
        return done(new Error('Invalid token payload'), false);
    }
    try {
        const user = await (0, userService_1.getUserById)(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: '/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await authService_1.default.findOrCreateUser(profile, 'github');
        if (user) {
            return done(null, user);
        }
        return done(null, false, { message: 'GitHub authentication failed' });
    }
    catch (err) {
        console.error('Error during GitHub authentication:', err);
        return done(err);
    }
}));
exports.default = passport_1.default;

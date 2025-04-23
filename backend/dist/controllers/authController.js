"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeHandler = exports.profile = exports.githubCallback = exports.login = exports.register = void 0;
const passport_1 = __importDefault(require("passport"));
const authService_1 = __importDefault(require("../services/authService"));
const generatejwt_secret_1 = __importDefault(require("../config/generatejwt-secret"));
const register = async (req, res) => {
    const { username, email, phone, password, country_code } = req.body;
    if (!username || !email || !phone || !password || !country_code) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    try {
        const newUser = await authService_1.default.register({
            username,
            email,
            phone,
            password,
            country_code,
        });
        if (!newUser) {
            throw new Error('Failed to register new user.');
        }
        const userWithId = await authService_1.default.findUserByEmail(newUser.email);
        if (!userWithId) {
            throw new Error('User not found after creation.');
        }
        // Map to IUserPayload
        const userPayload = {
            id: userWithId.id, // Now the user has an id
            email: userWithId.email,
        };
        const token = (0, generatejwt_secret_1.default)(userPayload);
        res.status(201).json({
            token,
            user: userWithId,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res, next) => {
    passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
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
            const payload = user;
            const token = (0, generatejwt_secret_1.default)(payload);
            res.json({
                token,
                user: payload,
            });
        });
    })(req, res, next);
};
exports.login = login;
const githubCallback = (req, res) => {
    passport_1.default.authenticate('github', { failureRedirect: '/login' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'GitHub authentication failed' });
        }
        req.logIn(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: loginErr.message });
            }
            const payload = user;
            const token = (0, generatejwt_secret_1.default)(payload);
            res.redirect(`http://localhost:3000?token=${token}`);
        });
    })(req, res);
};
exports.githubCallback = githubCallback;
const profile = (req, res) => {
    const authReq = req;
    if (!authReq.user) {
        res.status(401).json({ error: 'Unauthorized - No user found' });
        return;
    }
    res.json(authReq.user);
};
exports.profile = profile;
const getMeHandler = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized - No user found' });
            return;
        }
        const fullUser = await authService_1.default.findUserById(req.user.id);
        if (!fullUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const userDetails = authService_1.default.getUserDetails(fullUser);
        res.status(200).json({ user: userDetails });
    }
    catch (err) {
        console.error('Error fetching user details:', err.message);
        res.status(500).json({ error: err.message });
    }
};
exports.getMeHandler = getMeHandler;

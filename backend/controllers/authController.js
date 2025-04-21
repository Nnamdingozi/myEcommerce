'use strict';

const passport = require('passport');
const authService = require('../services/authService');
const generateToken = require('../database/config/generatejwt-secret');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, phone, password, country_code } = req.body;

  if (!username || !email || !phone || !password || !country_code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newUser = await authService.register({
      username,
      email,
      phone,
      password,
      country_code
    });

    if (!newUser || !newUser.id) {
      throw new Error('Failed to register new user, userId not found.');
    }

    const token = generateToken(newUser);
    res.status(201).json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    const token = generateToken(user);
    res.json({ token });
  })(req, res, next);
};

// Get user profile
exports.profile = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
  });
};

// GitHub OAuth callback
exports.githubCallback = async (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/auth/login'); // Redirect if authentication fails
    }

    try {
      const token = generateToken(user); // Generate JWT
      res.status(200).json({
        message: 'GitHub login successful',
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

// Access user credentials from request object
exports.getMeHandler = (req, res) => {
  try {
    const user = authService.getUserDetails(req.user);
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user details:', err.message);
    res.status(400).json({ error: err.message });
  }
};








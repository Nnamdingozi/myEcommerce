
'use strict';

const passport = require('passport');
const authService = require('../services/authService'); 
const generateToken = require('../database/config/generatejwt-secret')



exports.register = async (req, res) => {
  const { username, email, phone, password, country_code } = req.body;
  
  if (!username || !email || !phone || !password || !country_code) {
    console.error('Error: Missing fields during user registration');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      const newUser = await authService.register({ username, email, phone, password, country_code });
      
      if (!newUser || !newUser.id) {
        console.error("Error: New user ID not returned from database.");
        throw new Error("Failed to register new user, userId not found.");
      }

      console.log('New user in register controller:', newUser);

      const token = generateToken(newUser);
      res.status(201).json({ token });
      
  } catch (error) {
      console.error('User registration error:', error.message);
      res.status(500).json({ error: error.message });
  }
};




// Login user
exports.login = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(400).json({ error: info.message });
  
      const token = generateToken(user);
      res.json({ token });
    })(req, res, next);
  };


  // Get user profile
exports.profile = (req, res) => {
    res.json({ id: req.user.id, email: req.user.email, username: req.user.username });
  };
  




// Login with GitHub
exports.githubCallback = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect('/auth/login'); // Redirect to login page if authentication fails

        req.login(user, (err) => {
            if (err) return next(err);
            res.redirect('/'); // Redirect to homepage on success
        });
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









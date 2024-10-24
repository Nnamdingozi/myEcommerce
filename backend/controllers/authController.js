'use strict'

const passport = require('passport');
const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const {ensureAuthenticated} = require('../middlewares/authMiddleware');

exports.register = async(req, res) => {
    console.log('Register endpoint hit')
    const { username, email, phone, password, country_code,} = req.body
    try {
        const newUser = await authService.register(username, email, phone, password, country_code);
        console.log('user registered', newUser)
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({ error: err.message });

    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.log('Authentication failed', err)
            return next(err);}
        if(!user) {
            console.log('Login failed, User not found', info.message);
            return res.status(400).json({ error: info?.message});
        }

           

        req.login(user, (err) => {
            if(err)  {
                console.error('Login error:', err);
                return next(err)
            }
            res.status(200).json({message: 'Login successful', user});
            console.log('Login successful', user)
        });
    })(req, res, next);
};

exports.githubCallback = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect('/login'); // Adjust redirect as needed
  
      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect('/'); // Adjust redirect as needed
      });
    })(req, res, next);
  };
 

  exports.getMeHandler = (req, res) => {
    try {
        const user = authService.getUserDetails(req.user);
        res.status(200).json({user})
    }  catch(err) {
        res.status(400).json({ error: err.message });

    }
  };
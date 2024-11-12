// 'use strict'



// const bcrypt = require('bcrypt');
// const {ensureAuthenticated} = require('../middlewares/authMiddleware');


// // register new user
// exports.register = async(req, res) => {
//     console.log('Register endpoint hit')
//     const { username, email, phone, password, country_code,} = req.body
//     try {
//         const newUser = await authService.register(username, email, phone, password, country_code);
//         console.log('user registered', newUser);
//         res.redirect('/');  
//         res.status(201).json(newUser)
//     } catch(err) {
//         res.status(400).json({ error: err.message });

//     }
// };

// // login existing user
// exports.login = (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if(err) {
//             console.log('Authentication failed', err)
//             return next(err);}
//         if(!user) {
//             console.log('Login failed, User not found', info.message);
//             return res.status(400).json({ error: info?.message});
//         }

           

//         req.login(user, (err) => {
//             if(err)  {
//                 console.error('Login error:', err);
//                 return next(err)
//             }
//             res.status(200).json({message: 'Login successful', user});
//             res.redirect('/')
//             console.log('Login successful', user)
//         });
//     })(req, res, next);
// };


// // login with github
// exports.githubCallback = (req, res, next) => {
//     passport.authenticate('github', (err, user, info) => {
//       if (err) return next(err);
//       if (!user) return res.redirect('/login'); 
  
//       req.login(user, (err) => {
//         if (err) return next(err);
//         res.redirect('/'); 
//       });
//     })(req, res, next);
//   };
 

// //   access user credentials from request objext
//   exports.getMeHandler = (req, res) => {
//     try {
//         const user = authService.getUserDetails(req.user);
//         res.status(200).json({user})
//     }  catch(err) {
//         res.status(400).json({ error: err.message });

//     }
//   };

'use strict';

const passport = require('passport');
const authService = require('../services/authService'); 

// Register new user
exports.register = async (req, res) => {
    console.log('Register endpoint hit');
    const { username, email, phone, password, country_code } = req.body;
    try {
        const newUser = await authService.register(username, email, phone, password, country_code);
        console.log('User registered:', newUser);
        res.status(201).json(newUser);  // Send JSON response for successful registration
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(400).json({ error: err.message });
    }
};

// Login existing user
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication failed:', err);
            return next(err);
        }
        if (!user) {
            console.warn('Login failed, User not found:', info?.message);
            return res.status(400).json({ error: info?.message });
        }
        
        req.login(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }
            console.log('Login successful:', user);
            res.status(200).json({ message: 'Login successful', user });  
        });
    })(req, res, next);
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

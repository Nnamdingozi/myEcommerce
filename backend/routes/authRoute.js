// const express = require('express');
// const authRoute = express.Router();
// const passport = require('passport');
// const authController = require('../controllers/authController');

// //Registration router
// authRoute.post('/register', authController.register);
// //login route
// authRoute.post('/login', authController.login);
// //github OAth route
// authRoute.get('/github', passport.authenticate('github'));
// authRoute.get('/github/callback', authController.githubCallback);


// module.exports = authRoute;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const passport = require('passport');
require('../database/config/passport')(passport);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', authController.githubCallback);



module.exports = router;

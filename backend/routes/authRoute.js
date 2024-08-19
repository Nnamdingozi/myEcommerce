

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const passport = require('passport');
require('../database/config/passport')(passport);


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               githubId:
 *                 type: string
 *               coutry_code:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', authController.register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login of registered users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in a new user
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: get user with github id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               githubId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered a new user
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', authController.githubCallback);



module.exports = router;

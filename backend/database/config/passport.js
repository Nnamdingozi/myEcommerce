'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
// const jwtStrategy = require('passport-jwt');
const authService = require('../../services/authService');
const userService = require('../../services/userService')
require('dotenv').config();

module.exports = (passport) => {
    //local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await authService.findUserByEmail(email);
            if(!user) {
                return done(null, false, { message: 'Incorrect email' });

            }
            const isMatch = await authService.comparePassword(password, user.password);
            if(!isMatch) {
                return done(null, false, {message: 'Incorrect passoword'})
            }
            return done(null, user);
        } catch (err) {
            return done(err)
        }
    }));


    //github strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'

}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await authService.findOrCreateUser(profile, 'github');
            return done(null, user);
        
    } catch (err) {
        return done(err)
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async(id, done) => {
    try {
        const user = await userService.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

};
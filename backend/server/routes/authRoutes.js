const express = require('express');
const passport = require('passport');
const passportSetup = require('../config/passport-setup.js');

const authRouter = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');
const { default: axios } = require('axios');

// auth logout
authRouter.get('/logout', (req, res) => {
  // handle with passport
  res.send('loggin out');
});

// auth with google
authRouter.get('/google', passport.authenticate('google', {
  // tell passport what we want to get from the user profile
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'],
}));

// callback route for google to redirect to
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.status(400).send(`you reached the callback URI ${req.user}`);
});

module.exports = authRouter; // CHANGE 'TEMPLATE' TO YOUR ROUTE

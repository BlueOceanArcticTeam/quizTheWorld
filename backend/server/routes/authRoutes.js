/* eslint-disable import/extensions */
const express = require('express');
const passport = require('passport');
const passportSetup = require('../config/passport-setup.js');

const authRouter = express.Router();

const logout = (req, res, next) => {
  req.logOut();
  delete req.session;
  next();
};

// auth logout
authRouter.get('/logout', logout, (req, res) => {
  // handle with passport
  console.log('logged out');
  res.redirect('../../');
});

// auth with google
authRouter.get('/google', passport.authenticate('google', {
  // tell passport what we want to get from the user profile
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'],
}));

// callback route for google to redirect to  //32:00
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  req.logIn(req.user, (err) => {
    if (err) {
      throw err;
    } else {
      res.redirect('../../../');
    }
  });
});

authRouter.get('/userInformation', (req, res) => {
  // console.log('\n\n\n\n\n\n\n', req);
  if (req.user) {
    // console.log('logged in');
    res.send(req.user);
  } else {
    // console.log('logged out');
    res.send();
  }
});

module.exports = authRouter;

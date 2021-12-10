const express = require('express');
const passport = require('passport');
const passportSetup = require('../config/passport-setup.js');

const authRouter = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

// auth login
// authRouter.route('/login').get((req, res) => { // CHANGE GET TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
//   db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
//     if (err) throw err;
//     // TODO: res.send();
//   });
// });

// auth logout
authRouter.get('/logout', (req, res) => {
  // handle with passport
  res.send('loggin out');
});

// auth with google
authRouter.get('/google', passport.authenticate('google', {
  // tell passport what we want to get from the user profile
  scope: ['profile'],
}));

// callback route for google to redirect to
authRouter.get('/google/redirect', (req, res) => {
  res.send('you reached the callback URI');
});

// authRouter.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
//   db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
//     if (err) throw err;
//     // TODO: res.send();
//   });
// });

module.exports = authRouter; // CHANGE 'TEMPLATE' TO YOUR ROUTE

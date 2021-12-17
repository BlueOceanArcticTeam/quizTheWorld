/* eslint-disable import/extensions */
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const passportSetup = require('../config/passport-setup.js'); // (passport)
const db = require('../../database/db.js');

const authRouter = express.Router();

const logout = (req, res, next) => {
  req.logOut();
  delete req.session;
  next();
};
// register
authRouter.post('/register', async (req, res) => {
  // console.log('register', req.body);
  // if there is already a user, then send that back to the user
  const usernameCheck = await db.query('SELECT * FROM users WHERE username = $1;', [req.body.username]);
  const emailCheck = await db.query('SELECT * FROM users WHERE email = $1;', [req.body.email]);
  // console.log('usernameCheck', usernameCheck.rowCount);
  // console.log('emailCheck', emailCheck.rowCount);
  if (usernameCheck.rowCount > 0 || emailCheck.rowCount > 0) {
    res.send('user already exists');
  } else {
    // create new user in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.query(
      'INSERT INTO users(id, username, password, firstname, lastname, email, thumbnail_url) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id;',
      [req.body.username,
        hashedPassword,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.thumbnail_url],
      (err, data) => {
        // console.log('data returned', data);
        if (err) {
          throw err;
        } else {
          // callback(data.rows[0].id);
          res.send('user created');
          // console.log('done adding user');
        }
      },
    );
  }
});
// login with local passport
authRouter.post('/loginlocal', (req, res, next) => {
  // console.log('login local', req);
  passport.authenticate('local', (err, user, info) => { // info is for errors
    // console.log('passport.auth user', user);
    if (err) throw err;
    if (!user) {
      // console.log('send no user exists');
      res.send('No User Exists');
    } else {
      req.logIn(user.id, (user, err) => {
        // console.log('user', user);
        if (err) throw err;
        // console.log('\n\n/login', req.user);
        res.status(200).send('success');
        // res.redirect('../../');
      });
    }
  })(req, res, next);
});

// auth logout
authRouter.get('/logout', logout, (req, res) => {
  // handle with passport
  // console.log('logged out');
  res.redirect('/login'); // BUG: this doesn't redirect to the home, because it is alreaady at the / directory (thanks to react component rendering)
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

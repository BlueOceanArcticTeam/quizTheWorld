/* eslint-disable import/extensions */
const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

const axios = require('axios');
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const keys = require('./config/keys.js');
const db = require('../database/db.js');
const router = require('./routes/index.js');

// instantiate app
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

// encrypt our cookies
app.use(cookieSession({
  maxAge: 12 * 60 * 60 * 1000, // max age of the cookie is one day
  keys: [keys.session.cookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// API ROUTES
app.use('/api/template', router.template); // COPY THIS AND CHANGE TEMPLATE TO YOUR ROUTE
app.use('/api/profile', router.profile);
app.use('/api/quiz', router.quiz);
app.use('/api/messages', router.messages);
app.use('/api/answers', router.answers);
app.use('/api/auth', router.authRouter);

// WEB ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, console.log('Connected to the Arctic'));

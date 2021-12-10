const express = require('express');

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
authRouter.get('/google', (req, res) => {
  // handle with passport
  res.send('logging in with google');
});

// authRouter.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
//   db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
//     if (err) throw err;
//     // TODO: res.send();
//   });
// });

module.exports = authRouter; // CHANGE 'TEMPLATE' TO YOUR ROUTE

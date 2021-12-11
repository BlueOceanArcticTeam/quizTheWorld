const express = require('express');

const profile = express.Router();
const db = require('../../database/db.js');

// route to get profile information of user
profile.route('/:user_id').get((req, res) => {
  db.query('SELECT users.username, users.firstname, users.lastname, users.thumbnail_url, users/email,  FROM users, userQuizStatus WHERE user_id = $1;', [req.params.user_id], (err, data) => {
    if (err) throw err;
    // TODO: res.send();
  });
}); // THIS WILL NEED TESTING ONCE A USER POST ROUTE IS CREATED
// WITH myconstants (user_id) as (values (req.param.user_id)) SELECT * FROM users, userQuizStatus WHERE id = user_id;

// route to create a new user
profile.route('/create').post((req, res) => {
  // console.log(req.query);
  // db.query('INSERT INTO users VALUES ()')
});

// route to get friends list for user
profile.route('/:user_id/friends').get((req, res) => {
  db.query('SELECT * FROM friends WHERE user = $1;', [req.params.user_id], (err, data) => {
    if (err) throw err;
    res.send(data);
    // TODO: res.send();
  });
});

// route to make a query removing friends
profile.route('/:user_id/friends/:friend_id').delete((req, res) => {
  db.query('DELETE FROM friends WHERE user = $1 AND friend = $2; DELETE FROM friends WHERE user = $2 AND friend = $1;', [req.params.user_id, req.params.friend_id], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// route to make a query adding friends
profile.route('/:user_id/friends/:friend_id').post((req, res) => {
  db.query('INSERT INTO friends VALUES ($1, $2); INSERT INTO friends VALUES ($2, $1)', [req.params.user_id, req.params.friend_id], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// getting all users for the search bar
profile.route('/users').get((req, res) => {
  db.query('SELECT * FROM users', [], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = profile;

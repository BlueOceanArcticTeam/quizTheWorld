const express = require('express');

const profile = express.Router();
const db = require('../../database/db.js');

// getting all users for the search bar
profile.route('/users').get((req, res) => {
  db.query('SELECT id, username, firstname, lastname, email, thumbnail_url FROM users', [], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// route to get profile information of user
profile.route('/:user_id/meta').get((req, res) => {
  let output = {};
  const promiseArray = [];
  promiseArray.push(new Promise((resolve, reject) => {
    db
      .query(
        'SELECT TRUNC(AVG(CAST(numCorrect AS decimal) / CAST(totalQuestions AS decimal) * 100), 2) AS average, COUNT(*) FROM userQuizStatus WHERE user_id=$1 AND userQuizStatus.completed = true;',
        [req.params.user_id],
        (err, data) => {
          if (err) reject();
          output = { ...output, average: data.rows[0].average, count: data.rows[0].count };
          resolve();
        },
      );
  }));
  promiseArray.push(new Promise((resolve, reject) => {
    db
      .query('SELECT quiz_id, quizzes.title, dateCompleted, TRUNC(CAST(numCorrect AS decimal) / CAST(totalQuestions AS decimal) * 100, 2) as score FROM userQuizStatus INNER JOIN quizzes ON quiz_id = quizzes.id WHERE user_id=$1 AND completed = true ORDER BY dateCompleted DESC;', [req.params.user_id], (err, data) => {
        if (err) reject();
        output = { ...output, data: data.rows };
        resolve();
      });
  }));
  Promise.all(promiseArray)
    .then(() => {
      res.send(output);
    })
    .catch((err) => {
      res.send(err);
    });
});

profile.route('/:user_id').get((req, res) => {
  db.query('SELECT id, username, firstname, lastname, email, thumbnail_url FROM users WHERE id = $1', [req.params.user_id], (err, data) => {
    if (err) throw err;
    res.send(data.rows);
  });
});

// route to get friends list for user
profile.route('/:user_id/friends').get((req, res) => {
  db.query('SELECT users.id, username, email, lastname, firstname, thumbnail_url from users INNER JOIN friends ON user_id=$1 WHERE users.id=friend_id;', [req.params.user_id], (err, data) => {
    if (err) throw err;
    res.send(data);
    // TODO: res.send();
  });
});

// route to make a query removing friends
profile.route('/:user_id/friends/:friend_id').delete((req, res) => {
  const promiseArray = [];
  promiseArray.push(new Promise((resolve, reject) => {
    db.query('DELETE FROM friends WHERE user_id = $1 AND friend_id = $2;', [req.params.user_id, req.params.friend_id], (err, data) => {
      if (err) reject();
      resolve();
    });
  }));
  promiseArray.push(new Promise((resolve, reject) => {
    db.query('DELETE FROM friends WHERE user_id = $1 AND friend_id = $2', [req.params.friend_id, req.params.user_id], (err, data) => {
      if (err) reject();
      resolve();
    });
  }));
  Promise.all(promiseArray)
    .then(() => {
      res.send('deleted');
    })
    .catch(() => {
      res.send('error');
    });
});

// route to make a query adding friends
profile.route('/:user_id/friends/:friend_id').post((req, res) => {
  db.query('INSERT INTO friends VALUES (DEFAULT, $1, $2), (DEFAULT, $2, $1)', [req.params.user_id, req.params.friend_id], (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = profile;

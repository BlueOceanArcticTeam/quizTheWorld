const express = require('express');

const quizzes = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

quizzes.route('/d/:difficulty').get((req, res) => {
  const { difficulty } = req.params;
  db.query('SELECT * FROM quizzes WHERE difficulty = $1', [difficulty], (err, data) => {
    if (err) throw err;
    res.send(data.rows);
  });
});

quizzes.route('/c/:category').get((req, res) => {
  const { category } = req.params;
  db.query('SELECT * FROM quizzes WHERE category = $1 LIMIT 4', [category], (err, data) => {
    if (err) throw err;
    res.send(data.rows);
  });
});

// quizzes.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
//   db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
//     if (err) throw err;
//     // TODO: res.send();
//   });
// });

module.exports = quizzes;

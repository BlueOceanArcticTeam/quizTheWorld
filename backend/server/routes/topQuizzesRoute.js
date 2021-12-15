const express = require('express');

const topQuizzes = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

topQuizzes.route('/').get((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'topQuizzes' TO MATCH ABOVE
  db.query(
    'SELECT * FROM quizzes LIMIT 5',
  )
    .then((data) => res.send(data.rows))
    .catch((err) => { console.log(err); });
});

module.exports = topQuizzes; // CHANGE 'TEMPLATE' TO YOUR ROUTE

const express = require('express');

const quiz = express.Router();
const db = require('../../database/db.js');

// Get a single quiz by ID and associated questions
quiz.route('/:quiz_id').get((req, res) => {
  const id = req.params.quiz_id;
  db.query('SELECT * FROM quizzes, questions WHERE quizzes.id = $1 and questions.quiz_id = $1;', [id], (err, data) => {
    if (err) throw (err);
    res.send(data.rows);
  });
});

quiz.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) throw err;
    // TODO: res.send();
  });
});

module.exports = quiz; // CHANGE 'TEMPLATE' TO YOUR ROUTE

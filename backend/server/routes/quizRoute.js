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

quiz.route('/').post((req, res) => {
  const {
    user_id, quizID, numCorrect, totalQuestions, lastAnswered, completed, dateCompleted,
  } = req.body;
  // completed = completed.toString();

  db.query('INSERT INTO userquizstatus(quiz_id, user_id, completed, datecompleted, lastanswered, numcorrect, totalquestions) VALUES ($1, $2, $3, $4, $5, $6, $7);', [quizID, user_id, completed, dateCompleted, lastAnswered, numCorrect, totalQuestions], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) console.log(err);
  });
});

module.exports = quiz; // CHANGE 'TEMPLATE' TO YOUR ROUTE

// user_id: 1,
// quizID: 1,
// numCorrect: 1,
// totalQuestions: 10,
// lastAnswered: 4,
// completed: false,
// dateCompleted: '2021-12-13T23:20:50.072Z'

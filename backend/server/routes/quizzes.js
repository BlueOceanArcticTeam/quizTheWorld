const express = require('express');

const quizzes = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

quizzes.route('/:difficulty').get((req, res) => { // CHANGE GET TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  const { difficulty } = req.params;
  db.query('SELECT * FROM quizzes WHERE difficulty = $1 LIMIT 4', [difficulty], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) throw err;
    console.log('data rows ', data.rows);
    res.send(data.rows);
    // TODO: res.send();
  });
});

// quizzes.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
//   db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
//     if (err) throw err;
//     // TODO: res.send();
//   });
// });

module.exports = quizzes;

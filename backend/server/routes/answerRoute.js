const express = require('express');

const answers = express.Router();
const db = require('../../database/db.js');

// Get a single quiz by ID and associated questions
answers.route('/:question_id').get((req, res) => {
  const id = req.params.question_id;
  db.query('SELECT * FROM answers where question_id = $1;', [id], (err, data) => {
    if (err) throw (err);
    res.send(data.rows);
  });
});

answers.route('/').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  db.query('QUERY', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) throw err;
    // TODO: res.send();
  });
});

module.exports = answers; // CHANGE 'TEMPLATE' TO YOUR ROUTE

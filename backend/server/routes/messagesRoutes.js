/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
const express = require('express');

const messagesRoutes = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

messagesRoutes.route('/').get((req, res) => { // CHANGE GET TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  db.query('SELECT * FROM messages', [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) throw err;
    res.send(data.fields);
  });
});

messagesRoutes.route('/').post((req, res) => {
  const { senderID, recipientID, text, date } = req.body;
  db.query(
    'INSERT INTO messages (sender_user_id, recipient_user_id, text, date) VALUES ($1, $2, $3, $4)',
    [senderID, recipientID, text, date],
    (err, data) => {
      if (err) throw err;
      if (err) console.log(err);
      res.sendStatus(201);
    }
  );
});

module.exports = messagesRoutes; // CHANGE 'TEMPLATE' TO YOUR ROUTE

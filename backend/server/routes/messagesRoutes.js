/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
const express = require('express');

const messagesRoutes = express.Router();
const db = require('../../database/db.js');

messagesRoutes.route('/').get((req, res) => {
  db.query('SELECT * FROM messages', [], (err, data) => {
    if (err) throw err;
    res.send(data.fields);
  });
});

messagesRoutes.route('/history').get((req, res) => {
  const { senderID, recipientID } = req.body;
  db.query(
    // `SELECT * FROM messages
    //   WHERE (sender_user_id=$1 OR sender_user_id=$2) AND (recipient_user_id=$1 OR recipient_user_id=$2)`,
    `SELECT * FROM messages
    WHERE (sender_user_id=1 OR sender_user_id=2) AND (recipient_user_id=1 OR recipient_user_id=2)`,
    // [senderID, recipientID],
    (err, data) => {
      if (err) throw err;
      res.send(data.rows);
    }
  );
});

messagesRoutes.route('/').post((req, res) => {
  const { senderID, recipientID, text, date } = req.body;
  db.query(
    'INSERT INTO messages (sender_user_id, recipient_user_id, text, date) VALUES ($1, $2, $3, $4)',
    [senderID, recipientID, text, date],
    (err, data) => {
      if (err) throw err;
      res.sendStatus(201);
    }
  );
});

module.exports = messagesRoutes; // CHANGE 'TEMPLATE' TO YOUR ROUTE

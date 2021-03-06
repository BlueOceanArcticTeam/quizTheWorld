/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
const express = require('express');

const messageRoute = express.Router();
const db = require('../../database/db.js');

messageRoute.route('/').get((req, res) => {
  const { senderID, recipientID } = req.query;
  db.query(
    'SELECT * FROM messages WHERE (sender_user_id=$1 AND recipient_user_id=$2) OR (sender_user_id=$2 AND recipient_user_id=$1)',
    [senderID, recipientID])
    .then((data) => { res.send(data.rows); })
    .catch((err) => { console.log(err); });
});

messageRoute.route('/:user_id').get((req, res) => {
  db.query(`SELECT firstname, lastname FROM users WHERE id=${req.params.user_id}`)
    .then((data) => { res.send(data.rows[0]); })
    .catch((err) => { console.log(err); });
});

messageRoute.route('/').post((req, res) => {
  const { senderID, recipientID, text, date } = req.body;
  db.query(
    'INSERT INTO messages (sender_user_id, recipient_user_id, text, date) VALUES ($1, $2, $3, $4)',
    [senderID, recipientID, text, date])
    .then((data) => { res.sendStatus(201); })
    .catch((err) => { console.log(err); });
});

messageRoute.route('/').delete((req, res) => {
  const { messageID } = req.query;
  db.query('DELETE FROM messages WHERE id=$1', [messageID])
    .then((data) => { res.send(data); })
    .catch((err) => { console.log(err); });
});

module.exports = messageRoute;

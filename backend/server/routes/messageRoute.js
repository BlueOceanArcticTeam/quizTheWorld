/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
const express = require('express');

const messageRoute = express.Router();
const db = require('../../database/db.js');

messageRoute.route('/').get((req, res) => {
  const { senderID, recipientID } = req.query;
  db.query(
    'SELECT * FROM messages WHERE (sender_user_id=$1 AND recipient_user_id=$2) OR (sender_user_id=$2 OR recipient_user_id=$1)',
    [senderID, recipientID])
    .then((data) => { res.send(data.rows); })
    .catch((err) => { console.log(err); });
});

messageRoute.route('/:user_id').get((req, res) => {
  db.query(`SELECT username FROM users WHERE id=${req.params.user_id}`)
    .then((data) => { res.send(data.rows[0].username); })
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
  db.query(`DELETE FROM messages WHERE id=10`, [])
    .then()
    .catch();
});

module.exports = messageRoute;

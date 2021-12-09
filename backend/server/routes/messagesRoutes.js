/* eslint-disable import/extensions */
const express = require('express');

const messagesRoutes = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

messagesRoutes.route('/messages').get((req, res) => { // CHANGE GET TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  db.query(`SELECT * FROM messages`, [], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) throw err;
    // TODO: res.send();
    console.log('MESSAGES DATA:', data);
  });
});

messagesRoutes.route('/messages').post((req, res) => { // CHANGE POST TO THE METHOD YOU WANT, AND CHANGE 'TEMPLATE' TO MATCH ABOVE
  const { senderID, recipientID, text, dateTime } = req.body;
  db.query('QUERY', [senderID, recipientID, text, dateTime], (err, data) => { // FILL IN THE QUERY AND PARAMETERS
    if (err) throw err;
    // TODO: res.send();
  });
});

module.exports = messagesRoutes; // CHANGE 'TEMPLATE' TO YOUR ROUTE

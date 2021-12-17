const express = require('express');

const searchQuery = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

searchQuery.route('/').get((req, res) => {
  const { queryItem } = req.query;
  db.query('SELECT * FROM users WHERE username LIKE $1', [`%${queryItem}%`])
    .then((data) => { res.send(data.rows); })
    .catch((err) => { console.log(err); });
});

module.exports = searchQuery; // CHANGE 'TEMPLATE' TO YOUR ROUTE

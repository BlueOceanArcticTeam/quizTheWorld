const express = require('express');

const searchQuery = express.Router(); // CHANGE 'TEMPLATE' TO THE NAME OF YOUR ROUTE
const db = require('../../database/db.js');

searchQuery.route('/').get((req, res) => {
  const { queryItem } = req.query;
  db.query('SELECT username, firstname, lastname, thumbnail_url, id FROM users WHERE LOWER(username) LIKE LOWER($1) OR LOWER(firstname) LIKE LOWER($1) OR LOWER(lastname) LIKE LOWER($1)', [`%${queryItem}%`])
    .then((data) => { res.send(data.rows); })
    .catch((err) => { console.log(err); });
});

module.exports = searchQuery; // CHANGE 'TEMPLATE' TO YOUR ROUTE

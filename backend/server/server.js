const path = require('path');
const express = require('express');
const axios = require('axios');
const db = require('../database/db.js');
const router = require('./routes/index.js');

// instantiate app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

// API ROUTES
app.use('/api/template', router.template); // COPY THIS AND CHANGE TEMPLATE TO YOUR ROUTE
app.use('/api/quiz', router.quiz);
app.use('/api/answers', router.answers);

// WEB ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/quizzes', (req, res) => {
  db.query('SELECT * FROM quizzes', (err, data) => {
    if (err) { console.log(err); }
    // TODO: res.send();
  });
});

app.get('/quizzes/:quiz_id', (req, res) => {
  db.query(`SELECT * FROM quizzes WHERE quiz_id = ${req.params.quiz_id}`, (err, data) => {
    if (err) { console.log(err); }
    // TODO: res.send();
  });
});

app.get(':user_id/friends', (req, res) => {
  db.query('', (err, data) => {
    if (err) { console.log(err); }
    // TODO: res.send();
  });
});

app.listen(3000, console.log('Connected to the Arctic'));

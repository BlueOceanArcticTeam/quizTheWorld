const path = require('path');
const express = require('express');
const axios = require('axios');

// instantiate app
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, console.log('Connected to the Arctic'));

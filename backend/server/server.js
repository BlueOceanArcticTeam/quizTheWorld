const path = require('path');
const express = require('express');
const axios = require('axios');

// instantiate app
const app = express();

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../../client/dist')));

app.listen(3000, console.log('Connected to the Arctic'));

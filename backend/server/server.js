const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(6969, console.log('Connected to the Arctic'));

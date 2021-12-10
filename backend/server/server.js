const path = require('path');
const express = require('express');

const app = express();
const axios = require('axios');
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const db = require('../database/db.js');
const router = require('./routes/index.js');

// instantiate app
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

// API ROUTES
app.use('/api/template', router.template); // COPY THIS AND CHANGE TEMPLATE TO YOUR ROUTE
app.use('/api/messages', router.messagesRoutes);

app.listen(3000, console.log('Connected to the Arctic'));

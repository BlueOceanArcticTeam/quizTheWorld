const template = require('./template.js');
const quiz = require('./quizRoute.js');
// IMPORT YOUR ROUTER AS SHOWN ABOVE
const authRouter = require('./authRoutes.js');

module.exports = { template, authRouter, quiz }; // INCLUDE YOUR ROUTER IN THIS EXPORT STATEMENT

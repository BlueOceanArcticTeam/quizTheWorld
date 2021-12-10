/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
const template = require('./template.js');
const quiz = require('./quizRoute.js');
const answers = require('./answerRoute.js');
const messages = require('./messagesRoutes.js');
// IMPORT YOUR ROUTER AS SHOWN ABOVE

module.exports = {
  template,
  quiz,
  answers,
  messages
}; // INCLUDE YOUR ROUTER IN THIS EXPORT STATEMENT

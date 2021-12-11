/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
const template = require('./template.js');
const quiz = require('./quizRoute.js');
const answers = require('./answerRoute.js');
const messages = require('./messageRoute.js');
// IMPORT YOUR ROUTER AS SHOWN ABOVE
const profile = require('./profile.js');

module.exports = {
  template,
  quiz,
  answers,
  messages
}; // INCLUDE YOUR ROUTER IN THIS EXPORT STATEMENT


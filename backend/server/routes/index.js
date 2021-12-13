/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
const template = require('./template.js');
const quiz = require('./quizRoute.js');
const answers = require('./answerRoute.js');
const messages = require('./messageRoute.js');
// IMPORT YOUR ROUTER AS SHOWN ABOVE
const profile = require('./profile.js');
const authRouter = require('./authRoutes.js');

module.exports = {
  template,
  profile,
  quiz,
  answers,
  messages,
  authRouter,
}; // INCLUDE YOUR ROUTER IN THIS EXPORT STATEMENT

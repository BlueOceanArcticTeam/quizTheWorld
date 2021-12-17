/* eslint-disable import/extensions */
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const keys = require('./config/keys.js');
const router = require('./routes/index.js');

// instantiate app
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(bodyParser.urlencoded({ extended: true })); // used for passport local
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
// encrypt our cookies
app.use(cookieSession({
  maxAge: 12 * 60 * 60 * 1000, // max age of the cookie is one day
  keys: [keys.session.cookieKey],
}));
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser('secretcode'));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// API ROUTES
app.use('/api/template', router.template); // COPY THIS AND CHANGE TEMPLATE TO YOUR ROUTE
app.use('/api/profile', router.profile);
app.use('/api/quiz', router.quiz);
app.use('/api/messages', router.messages);
app.use('/api/answers', router.answers);
app.use('/api/topQuizzes', router.topQuizzes);
app.use('/api/auth', router.authRouter);
app.use('/api/quizzes', router.quizzes);
app.use('/api/create', router.createQuiz);
app.use('/api/searchQuery', router.searchQuery);

// WEB ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, console.log('Connected to the Arctic'));

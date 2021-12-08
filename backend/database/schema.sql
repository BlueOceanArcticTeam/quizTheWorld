DROP DATABASE IF EXISTS quizKnows;

CREATE DATABASE quizKnows;

use quizKnows;

CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT,
  correct BOOLEAN,
  text VARCHAR(200),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT,
  text VARCHAR(200),
  thumbnail_url TEXT,
  questionType VARCHAR(15),
  learnMore_url TEXT,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_user_id INT,
  recipient_user_id INT,
  text VARCHAR(200),
  dateTime DATETIME,
  FOREIGN KEY (sender_user_id) REFERENCES users(id),
  FOREIGN KEY (recipient_user_id) REFERENCES users(id)
);

CREATE TABLE userAnswers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  question_id INT,
  submittedAnswer_id INT,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (submittedAnswer_id) REFERENCES answers(id)
);

CREATE TABLE quizzes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(30) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    source INT NOT NULL,
    dateCreated DATETIME NOT NULL,
    numSubmissions INT NOT NULL,
    FOREIGN KEY (source) REFERENCES users(id)
);

CREATE TABLE userQuizStatus(
    id INT PRIMARY KEY AUTO_INCREMENT,
    quiz_id INT NOT NULL,
    user_id INT NOT NULL,
    completed BOOLEAN NOT NULL,
    dateCompleted DATETIME,
    lastAnswered INT NOT NULL,
    numCorrect INT,
    numAttempted INT
    FOREIGN KEY (quiz_id) REFERENCES quiz(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lastAnswered) REFERENCES questions(id)
);

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    thumbnail_url TEXT
);
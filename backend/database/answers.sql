DROP DATABASE IF EXISTS quizKnows;

CREATE DATABASE quizKnows;

use quizKnows;

CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question_id INT,
  correct BOOLEAN,
  text VARCHAR(100),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quiz_id INT,
  text VARCHAR(100),
  thumbnail_url TEXT,
  questionType VARCHAR(15),
  learnMore_url TEXT
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
\i backend/database/schema.sql

\c quizknows

INSERT INTO users (id, username, password, firstname, lastname, thumbnail_url, email) VALUES (1,'QuizKnows', 'iamcool', 'Quiz', 'Knows', 'null', 'empty@empty.com');
INSERT INTO users (id, username, password, firstname, lastname, thumbnail_url, email) VALUES (2,'Gerald', 'iamcool', 'Gerald', 'Anderson', 'null', 'gerald@anderson.com');
INSERT INTO users (id, username, password, firstname, lastname, thumbnail_url, email) VALUES (3,'SomoneElse', 'iamcool', 'Tanya', 'Turkey', 'null', 'tanyat@emailprovider.com');

\COPY quizzes(id,title, category, difficulty, source, datecreated, numsubmissions) FROM './backend/database/data/quizzes.csv' DELIMITER ',' CSV HEADER;

\COPY questions(id, quiz_id, text, thumbnail_url, questionType, learnmore_url) FROM './backend/database/data/question.csv' DELIMITER ',' CSV HEADER;

\COPY answers(question_id, correct, text) FROM './backend/database/data/answers.csv' DELIMITER ',' CSV HEADER;

INSERT INTO userQuizStatus (id, quiz_id, user_id, completed, dateCompleted, lastAnswered, numCorrect, totalQuestions) VALUES (1, 1, 2, true, '05 Dec 2021', 1, 9, 12);
INSERT INTO userQuizStatus (id, quiz_id, user_id, completed, dateCompleted, lastAnswered, numCorrect, totalQuestions) VALUES (2, 2, 2, true, '06 Dec 2021', 2, 11, 14);
\i backend/database/schema.sql

\c quizknows

INSERT INTO users (id, username, password, firstname, lastname, thumbnail_url, email) VALUES (1,'QuizKnows', 'iamcool', 'Quiz', 'Knows', 'null', 'empty@empty.com');

\COPY quizzes(id,title, category, difficulty, source, datecreated, numsubmissions) FROM './backend/database/data/quizzes.csv' DELIMITER ',' CSV HEADER;

\COPY questions(id, quiz_id, text, thumbnail_url, questionType, learnmore_url) FROM './backend/database/data/question.csv' DELIMITER ',' CSV HEADER;

\COPY answers(question_id, correct, text) FROM './backend/database/data/answers.csv' DELIMITER ',' CSV HEADER;
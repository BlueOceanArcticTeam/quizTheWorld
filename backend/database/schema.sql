-- NAVIGATE TO YOUR REPO DIRECTORY AND RUN THE FOLLOWING COMMAND FROM YOUR POSTGRES CLI
-- \i backend/database/schema.sql

DROP DATABASE IF EXISTS quizknows;

CREATE DATABASE quizknows;

\c quizknows;

CREATE TABLE public.answers (
  id INT unique,
  question_id INT,
  correct BOOLEAN,
  text VARCHAR(200)
);

CREATE TABLE public.questions (
  id INT unique,
  quiz_id INT,
  text VARCHAR(200),
  thumbnail_url TEXT,
  questionType VARCHAR(15),
  learnMore_url TEXT
);

CREATE TABLE public.messages (
  id INT unique,
  sender_user_id INT,
  recipient_user_id INT,
  text VARCHAR(200),
  date DATE NOT NULL

);

CREATE TABLE public.userAnswers (
  id INT unique,
  user_id INT,
  question_id INT,
  submittedAnswer_id INT
);

CREATE TABLE public.quizzes(
    id INT unique,
    category VARCHAR(30) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    source INT NOT NULL,
    dateCreated DATE NOT NULL NOT NULL,
    numSubmissions INT NOT NULL
);

CREATE TABLE public.userQuizStatus(
    id INT unique,
    quiz_id INT NOT NULL,
    user_id INT NOT NULL,
    completed BOOLEAN NOT NULL,
    dateCompleted DATE NOT NULL,
    lastAnswered INT NOT NULL,
    numCorrect INT,
    numAttempted INT
   
);

CREATE TABLE public.users(
    id INT unique,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    thumbnail_url TEXT,
    email TEXT
);


ALTER TABLE public.answers ADD CONSTRAINT fk_answers FOREIGN KEY (question_id) REFERENCES public.questions(id);
ALTER TABLE public.questions ADD CONSTRAINT fk_questions FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);
ALTER TABLE public.messages ADD CONSTRAINT fk_sender FOREIGN KEY (sender_user_id) REFERENCES public.users(id);
ALTER TABLE public.messages ADD CONSTRAINT fk_recipient FOREIGN KEY (recipient_user_id) REFERENCES public.users(id);
ALTER TABLE public.userAnswers ADD CONSTRAINT fk_questions_stats FOREIGN KEY (question_id) REFERENCES public.questions(id);
ALTER TABLE public.userAnswers ADD CONSTRAINT fk_answers_stats FOREIGN KEY (submittedAnswer_id) REFERENCES public.answers(id);
ALTER TABLE public.quizzes ADD CONSTRAINT fk_source FOREIGN KEY (source) REFERENCES public.users(id);
ALTER TABLE public.userQuizStatus ADD CONSTRAINT fk_user_quiz FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);
ALTER TABLE public.userQuizStatus ADD CONSTRAINT fk_user_friends FOREIGN KEY (user_id) REFERENCES public.users(id);
ALTER TABLE public.userQuizStatus ADD CONSTRAINT fk_user_history FOREIGN KEY (lastAnswered) REFERENCES public.questions(id);

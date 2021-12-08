CREATE SCHEMA [IF NOT EXISTS] quizSchema;
CREATE TABLE  quizzes(
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
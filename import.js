/* eslint-disable no-plusplus */
const axios = require('axios');
const fs = require('fs');
const quizzes = require('./quizzes.json');

const baseURL = 'https://opentdb.com/api.php?amount=10&type=multiple&token=3e24f005a432012df4018d7daf4d2f5e1d911d854714eeee5ea8b5adf268557d&category=';
const trailURL = '&difficulty=';
const category = [9, 10, 11, 12, 17, 22, 27, 20];
const difficulty = ['easy', 'medium', 'hard'];

const importQuiz = () => {
  for (let i = 0; i < category.length; i++) {
    for (let j = 0; j < difficulty.length; j++) {
      axios.get(baseURL + category[i] + trailURL + difficulty[j])
        .then((res) => {
          fs.appendFileSync('quizzes.txt', JSON.stringify(res.data), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('file saved');
            }
          });
        });
    }
  }
};

// importQuiz();

// console.log(quizzes[0]);

const seperateData = (quizzes) => {
  let question_id = 1;
  // let answer_id = 1;
  for (let i = 0; i < quizzes.length; i += 1) {
    const currentQuiz = {
      id: i + 1,
      category: quizzes[i].results[0].category,
      difficulty: quizzes[i].results[0].difficulty,
      source: 1,
      dateCreated: new Date(),
      numSubmissions: 0,
    };
    // write quiz to file
    fs.appendFileSync('question.csv', `${currentQuiz}\n`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(' save success ');
      }
    }); //
    for (let j = 0; j < quizzes[i].results.length; j += 1) {
      // each of these will be a question
      const q = quizzes[i].results[j];
      const question = {
        id: question_id,
        quiz_id: i + 1,
        text: q.question,
        thumbnail_url: '',
        questionType: q.type,
        learnMore_url: '',
      };
      // write to file
      fs.appendFileSync('question.csv', `${question}\n`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(' save success ');
        }
      });
      // answers
      const correctAnswer = {
        question_id,
        correct: true,
        text: q.correct_answer,
      };
      fs.appendFileSync('answers.csv', `${correctAnswer}\n`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(' save success ');
        }
      });
      // incorrect answers
      for (let a = 0; a < q.incorrect_answers.length; a += 1) {
        const answer = q.incorrect_answers[a];
        const incorrectAnswer = {
          question_id,
          correct: false,
          text: answer,
        };
        fs.appendFileSync('answers.csv', `${incorrectAnswer}\n`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(' save success ');
          }
        });
      }
      question_id += 1;
    }
  }
};

seperateData(quizzes);
/**
 *  id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(30) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    source INT NOT NULL,
    dateCreated DATETIME NOT NULL,
    numSubmissions INT NOT NULL,
    FOREIGN KEY (source) REFERENCES users(id)
 */

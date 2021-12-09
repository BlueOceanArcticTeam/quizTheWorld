/* eslint-disable no-plusplus */
const axios = require('axios');
const fs = require('fs');

const baseURL = 'https://opentdb.com/api.php?amount=10&type=multiple&token=3e24f005a432012df4018d7daf4d2f5e1d911d854714eeee5ea8b5adf268557d&category=';
const trailURL = '&difficulty=';
const category = [9, 10, 11, 12, 17, 22, 27, 20];
const difficulty = ['easy', 'medium', 'hard'];

const importQuiz = () => {
  for (let i = 0; i < category.length; i++) {
    for (let j = 0; j < difficulty.length; j++) {
      axios.get(baseURL + category[i] + trailURL + difficulty[j])
        .then((res) => {
          fs.appendFileSync('quizzes.json', JSON.stringify(res.data), (err) => {
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

importQuiz();

/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../context.js';

export default function QuizPage() {
  // set state variables below:

  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE

  const { currentQuestion, answers } = useContext(AppContext);
  const [selected, setSelected] = useState();

  const nextHandler = () => {
    // handle the button that moves to the next question
  };

  const backHandler = () => {
    // handle the button that moves to the previous question
  };
  // use Effect:
  console.log(quiz_id);
  useEffect(() => {
    if (typeof (quiz_id) === 'number') {
      axios.get(`/api/quiz/${quiz_id}`)
        .then((res) => {
          const { data } = res;
          const quiz = {
            id: data.quiz_id,
            category: data.category,
            difficulty: data.difficulty,
            source: data.source,
            datecreated: data.datecreated,
            numsubmissions: data.numsubmissions,
          };
          setQuiz(quiz);
          const questions = [];
          res.forEach((ele) => {
            const {
              id, text, thumbnail_url, questiontype, learnmore_url,
            } = ele;
            const entry = {
              id,
              text,
              thumbnail_url,
              questiontype,
              learnmore_url,
            };
            questions.push(entry);
          });
          setQuestions(questions);
        });
    }
  });

  // render component:
  return (
    <div>
      Example
    </div>
  );
}

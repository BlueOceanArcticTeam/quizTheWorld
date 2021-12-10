/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../context.js';
import QuizContext from './quizContext.js';
import Question from './Question.jsx';

export default function QuizPage() {
  // set state variables below:

  const quiz_id = useContext(AppContext);
  const [quizState, setQuiz] = useState();
  const [questionsArray, setQuestions] = useState();
  const [toggle, setToggle] = useState(true);
  const [questionIndex, setIndex] = useState(0);

  const { currentQuestion, answers } = useContext(AppContext);
  const [selected, setSelected] = useState();

  const nextHandler = () => {
    let i = questionIndex;
    setIndex(i += 1);
    // handle the button that moves to the next question
  };

  const backHandler = () => {
    let i = questionIndex;
    if (i > 0) {
      setIndex(i -= 1);
    }
    // handle the button that moves to the previous question
  };
  // use Effect:
  useEffect(() => {
    const count = 0;
    if (toggle) { // TEMP HOLD TO PREVENT INFINITE FETCHES, USE QUIZ_ID
      setToggle(false);
      axios.get('/api/quiz/1') // 1 should be quiz_id
        .then((res) => {
          const { data } = res;
          const quiz = {
            id: data[0].quiz_id,
            category: data[0].category,
            difficulty: data[0].difficulty,
            source: data[0].source,
            datecreated: data[0].datecreated,
            numsubmissions: data[0].numsubmissions,
          };
          setQuiz(quiz);
          const questions = [];
          data.forEach((ele) => {
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
  }, [quiz_id]);
  // Just so I can see the data
  useEffect(() => {
    console.log('questions ', questionsArray);
    console.log('quiz ', quizState);
  }, [questionsArray]);

  // render component:
  if (!questionsArray) {
    return (
      <div>
        Example
      </div>
    );
  }
  return (
    <QuizContext.Provider value={{ questionsArray }}>
      <Question index={questionIndex} />
    </QuizContext.Provider>
  );
}

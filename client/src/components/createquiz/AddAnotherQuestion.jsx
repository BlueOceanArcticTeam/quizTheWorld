/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/function-component-definition */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import gsap, { Power3, Power2 } from 'gsap';
import QuestionImage from './assets/Question.png';
import './CreateQuiz.css';
import {
  Input, FormControl, InputLabel, FormHelperText, Select, MenuItem, Button,
} from '@mui/material';
import {
  Link,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import axios from 'axios';

export default function AddAnotherQuestion({
  stepCount, setStepCount,
  quiz, answers, question,
  answerGroup, questionGroup,
  setAnswerGroup, setQuestionGroup,
  quizId, setQuizId,
}) {
  const boxRef = useRef(null);
  let updatedQuestions;
  let questionIds = [];

  useEffect(() => {
    gsap.to(boxRef.current, {
      ease: Power2.out,
      opacity: 1,
      duration: 1.75,
    });
    // Update the document title using the browser API
  }, [stepCount]);

  function updateAllQuestionIds(id) {
    updatedQuestions = questionGroup.map((question) => ({ ...question, quiz_id: id }));
    console.log(updatedQuestions, 'EEEEEE****');
  }

  function updateAllAnswerIds(idArr) {
    let tempAnswers = answerGroup;

    for (let i = 0; i < idArr.length; i += 1) {
      for (let j = 0; j < tempAnswers[i].length; j += 1) {
        tempAnswers[i][j].question_id = idArr[i];
      }
    }
    submitAnswers(tempAnswers);
  }

  function submitAnswers(answersArr) {
    for (let i = 0; i < answersArr.length; i += 1) {
      axios.post('/api/create/answers', answersArr[i])
        .then((res) => { console.log(res.data); })
        .catch((err) => console.log(err));
    }
  }

  function submitQuestions() {
    let promiseArr = [];
    for (let i = 0; i < updatedQuestions.length; i += 1) {
      promiseArr.push(axios.post('/api/create/questions', updatedQuestions[i])
        .then((res) => res.data)
        .catch((err) => console.log(err)));
    }
    Promise.all(promiseArr)
      .then((res) => { updateAllAnswerIds(res); });
  }

  function createQuiz() {
    console.log(quiz, '-----');
    axios.post('/api/create', quiz)
      .then((res) => { setQuizId(res.data); updateAllQuestionIds(res.data); })
      .then(() => { submitQuestions(); })
      .catch((err) => console.log(err));
  }

  return (

    <div id="cardContainer" ref={boxRef} style={{ opacity: '0' }}>
      <div
        id="card"
        style={{
          backgroundImage: `url(${QuestionImage})`,
          objectFit: 'contain',
        }}
      >
        <div style={{
          color: 'white', width: '17em', background: 'none', columnGap: '1.5em', fontSize: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1em',
        }}
        >
          <span style={{ width: '17em', fontSize: '50px' }}>
            Question Created!
          </span>
        </div>
        <Button
          onClick={() => { setStepCount(stepCount - 3); }}
          variant="contained"
          sx={{
            position: 'absolute',
            marginLeft: 'auto',
            backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)',
            color: '#FFF1EA',
            textDecoration: 'none',
            right: '18.5em',
            bottom: '21.65em',
            width: '12em',
          }}
        >
          Add Another ?
        </Button>
        <span style={{
          position: 'absolute', width: '5em', fontSize: '30px', bottom: '1.65em', right: '11em', color: 'white',
        }}
        >
          Or..finished?
        </span>
        <Button
          onClick={() => { createQuiz(); }}
          to="/"
          component={Link}
          variant="contained"
          sx={{
            position: 'absolute',
            marginLeft: 'auto',
            backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)',
            color: '#FFF1EA',
            textDecoration: 'none',
            right: '7em',
            bottom: '5em',
            width: '12em',
          }}
        >
          Create Test!
        </Button>
      </div>
    </div>
  );
}

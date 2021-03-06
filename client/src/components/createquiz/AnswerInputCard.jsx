/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/function-component-definition */
import React, {
  useState, useContext, useEffect, useRef, question,
} from 'react';
import QuestionImage from './assets/Question.png';
import gsap, { Power3, Power2 } from 'gsap';
import './CreateQuiz.css';
import {
  Input, FormControl, InputLabel, FormHelperText, Select, MenuItem, Button,
} from '@mui/material';

export default function AnswerInputCard({
  stepCount, setStepCount, answers,
  setAnswers, currentQuestionId, question,
  setQuestion, setCurrentQuestionId,
  answerGroup, setAnswerGroup, setQuestionGroup,
  questionGroup,
}) {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      ease: Power2.out,
      opacity: 1,
      duration: 1.75,
    });
    // Update the document title using the browser API
  }, [stepCount]);

  function updateCorrectAnswer(e) {
    setAnswers({
      ...answers,
      correct: e.target.value,
    });
  }

  function updateAnswerA(e) {
    setAnswers({
      ...answers,
      A: e.target.value,
    });
  }

  function updateAnswerB(e) {
    setAnswers({
      ...answers,
      B: e.target.value,
    });
  }

  function updateAnswerC(e) {
    setAnswers({
      ...answers,
      C: e.target.value,
    });
  }

  function updateAnswerD(e) {
    setAnswers({
      ...answers,
      D: e.target.value,
    });
  }

  function clearOldQuestionAndCreateNewOne() {
    setQuestion({
      question_id: null,
      user_id: null,
      quiz_id: null,
      text: '',
      questionType: '',
    });
  }

  function storeAnswersForSubmitting() {
    const answersArr = [];
    let correct;
    const answerA = {
      question_id: currentQuestionId,
      correct: false,
      text: answers.A,
    };
    const answerB = {
      question_id: currentQuestionId,
      correct: false,
      text: answers.B,
    };
    const answerC = {
      question_id: currentQuestionId,
      correct: false,
      text: answers.C,
    };
    const answerD = {
      question_id: currentQuestionId,
      correct: false,
      text: answers.D,
    };
    answersArr.push(answerA, answerB, answerC, answerD);
    // get the text of the correct answer
    for (const key in answers) {
      if (key === answers.correct) {
        correct = answers[key];
      }
    }
    // check the answers and if it matches the correct one, update the correct to true
    answersArr.map((item) => {
      if (item.text === correct) {
        item.correct = true;
      }
      return item;
    });
    setAnswerGroup((answerGroup) => [...answerGroup, answersArr]);
    setCurrentQuestionId(currentQuestionId + 1);
    clearOldQuestionAndCreateNewOne();
  }

  function validateInputsAndChangeModal() {
    if (answers.correct === null || answers.A === '' || answers.B === '' || answers.C === '' || answers.D === '') {
      alert('Please fill out the form!');
    } else {
      setStepCount(stepCount + 2);
    }
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
          <span>Select Correct Answer: </span>
          <span>Enter Answer A: </span>
          <span>Enter Answer B: </span>
          <span>Enter Answer C: </span>
          <span>Enter Answer D: </span>
        </div>
        <div style={{
          justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', width: '18em', gap: '1.5em', marginRight: '10em',
        }}
        >
          <FormControl variant="filled" sx={{ width: '12em' }}>
            <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
            <Select
              defaultValue=""
              onChange={(e) => updateCorrectAnswer(e)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Category"
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>
          <input
            onChange={updateAnswerA}
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <input
            onChange={updateAnswerB}
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <input
            onChange={updateAnswerC}
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <input
            onChange={updateAnswerD}
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <Button
            onClick={() => { validateInputsAndChangeModal(); storeAnswersForSubmitting(); }}
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
            Next
          </Button>
          <Button
            onClick={() => { setStepCount(stepCount - 1); setQuestionGroup(questionGroup.filter((item) => item.question_id !== currentQuestionId)); }}
            variant="contained"
            sx={{
              position: 'absolute',
              marginLeft: 'auto',
              backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)',
              color: '#FFF1EA',
              textDecoration: 'none',
              left: '7em',
              bottom: '5em',
              width: '12em',
            }}
          >
            Previous
          </Button>
        </div>
      </div>
    </div>
  );
}

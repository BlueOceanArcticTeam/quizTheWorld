/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import QuizBackground from './assets/Question.png';
import AppContext from '../../context.js';
import QuizContext from './quizContext.js';
import Question from './Question.jsx';

export default function QuizPage() {
  // set state variables below:
  const quiz_id = useContext(AppContext);
  const [quizState, setQuiz] = useState();
  const [questionsArray, setQuestions] = useState();
  const [answersArray, setAnswers] = useState(['Please', 'Wait', 'Files', 'Loading']);
  const [toggle, setToggle] = useState(true);
  const [questionIndex, setIndex] = useState(10000000);
  const [currentQuestion, setCurrent] = useState();
  const [last, setLast] = useState(0);
  const [render, setRender] = useState(false);
  const [buttonText, setButton] = useState('START QUIZ!');
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  // This function will let you start a quiz and then let you submit one later!
  const startSubmit = () => {
    if (!render) {
      setRender(true);
      setIndex(0);
      setButton('SUBMIT QUIZ');
    }
  };
  const selectAnswer = (e) => {
    submittedAnswers[questionIndex + 1] = Number(e.target.id);
    console.log('submittedAnswers ', submittedAnswers);
    console.log('correctAnswers ', correctAnswers);
  };

  const nextHandler = () => {
    let i = questionIndex;
    if (i < questionsArray.length - 1) {
      setIndex(i += 1);
    }
    // handle the button that moves to the next question
  };
  const backHandler = () => {
    let i = questionIndex;
    if (i > 0) {
      setIndex(i -= 1);
    }
    // handle the button that moves to the previous question
  };

  // Initial Fetch for quiz and associated questions
  useEffect(() => {
    if (toggle) { // TEMP HOLD TO PREVENT INFINITE FETCHES, USE QUIZ_ID
      setToggle(false);
      axios.get('/api/quiz/5') // 1 should be quiz_id
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
  // Fetch answers when the question changes
  useEffect(() => {
    if (questionsArray) {
      const query = questionsArray[questionIndex]?.id;
      axios.get(`/api/answers/${query}`)
        .then((res) => {
          const { data } = res;
          const store = [];
          data.forEach((ele) => {
            const answer = {
              text: ele.text,
              correct: ele.correct,
            };
            store.push(answer);
            for (let i = 0; i < store.length; i += 1) {
              if (store[i].correct === true) {
                correctAnswers[questionIndex + 1] = i;
              }
            }
          });
          const question = questionsArray[questionIndex].text;
          const l = questionsArray.length - 1;
          setCurrent(question);
          setAnswers(store);
          setLast(l);
        });
    }
  }, [questionIndex]);

  useEffect(() => {}, [render]);

  // render component:
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '-100',
      position: 'relative',
    }}
    >
      <img
        src={QuizBackground}
        alt=""
        style={{
          zIndex: '-100',
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
      />
      {/* This div hold the question and the chat */}
      <div style={{
        background: '#D6C0E5',
        width: '85em',
        height: '47em',
        position: 'absolute',
        marginTop: '5em',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '15px',
      }}
      >
        {/* This is the question container */}
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '2em',
          }}
          >
            <Button
              onClick={backHandler}
              variant="contained"
              sx={{
                width: '30%',
                marginTop: '10px',
                float: 'right',
                backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)',
                ':hover': {
                  bgcolor: '#ff9100', // theme.palette.primary.main
                  color: 'white',
                },
              }}
            >
              Previous
            </Button>
            {/* Span where the current question goes */}
            <span style={{ marginTop: '15px', color: '#F78670', fontWeight: 'bold' }}>
              {questionIndex + 1}
              {' '}
              /
              {' '}
              {last + 1}
            </span>
            <Button
              onClick={nextHandler}
              variant="contained"
              sx={{
                width: '30%',
                marginTop: '10px',
                float: 'right',
                backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)',
                ':hover': {
                  bgcolor: '#ff9100', // theme.palette.primary.main
                  color: 'white',
                },
              }}
            >
              Next
            </Button>
          </div>
          {/* This is for the question itself and answer selection */}
          <div style={{
            width: '40em',
            height: '35em',
            width: '35em',
            backgroundImage: 'linear-gradient(#9D56CE, #9925E6)',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#DBD7D1',
          }}
          >
            <h3 style={{ fontSize: '2em' }}>{currentQuestion}</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: '23em',
            }}
            >
              <span id="1" onClick={selectAnswer} style={{ fontSize: '2em' }}>
                {' '}
                {answersArray[0]?.text}
              </span>
              <span id="2" onClick={selectAnswer} style={{ fontSize: '2em' }}>
                {' '}
                {answersArray[1]?.text}
              </span>
              <span id="3" onClick={selectAnswer} style={{ fontSize: '2em' }}>
                {' '}
                {answersArray[2]?.text}
              </span>
              <span id="4" onClick={selectAnswer} style={{ fontSize: '2em' }}>
                {' '}
                {answersArray[3]?.text}
              </span>
              {/* Submit Quiz Button */}
              {/* Youll want to hide this one until the last question appears */}
              <Button
                onClick={startSubmit}
                variant="contained"
                sx={{
                  width: '100%',
                  marginTop: '10px',
                  float: 'right',
                  backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)',
                  ':hover': {
                    bgcolor: '#ff9100', // theme.palette.primary.main
                    color: 'white',
                  },
                }}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>

        {/* This is the Chat container  */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '2em', marginTop: '1.5em',
        }}
        >
          <h2 style={{ marginBottom: '1.25em', color: '#F78670' }}>Chat with Friends</h2>
          <div style={{
            width: '25em', height: '35em', background: 'pink', borderRadius: '15px',
          }}
          >
            Goodbye
          </div>
        </div>
      </div>
    </div>
  );
}

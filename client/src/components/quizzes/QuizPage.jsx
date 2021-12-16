/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import QuizBackground from './assets/Question.png';
import { AppContext } from '../../App.jsx';
import './Quizzes.css';

export default function QuizPage() {
  // set state variables below:
  const [quiz_id, setQuizID] = useState();
  const { user } = useContext(AppContext);
  const [quizState, setQuiz] = useState();
  const [questionsArray, setQuestions] = useState();
  const [answersArray, setAnswers] = useState(['Please', 'Wait', 'Files', 'Loading']);
  const [toggle, setToggle] = useState(false);
  const [questionIndex, setIndex] = useState(-1);
  const [currentQuestion, setCurrent] = useState('ARE YOU READY TO START AN AMAZING QUIZ? CLICK BELOW TO GET GOING! DON\'T FORGET TO ANSWER ALL THE QUESTIONS ');
  const [last, setLast] = useState(0);
  const [backup, setBackup] = useState();
  const [render, setRender] = useState(false);
  const [buttonText, setButton] = useState('START QUIZ!');
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selected, setSelected] = useState();
  const [submit, setSubmit] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideNext, setNext] = useState(true);
  const [hideBack, setBack] = useState(true);
  const [hideNum, setNum] = useState(true);
  // This function will let you start a quiz and then let you submit one later!
  const startSubmit = () => {
    if (!render) {
      setBack(false);
      setNext(false);
      setNum(false);
      setRender(true);
      setIndex(0);
      setButton('SUBMIT QUIZ');
      setHide(true);
    } if (buttonText === 'SUBMIT QUIZ') {
      let correctCount = 0;
      setTotalCorrect(0);
      for (let i = 1; i < questionsArray.length + 1; i += 1) {
        if (submittedAnswers[i] !== undefined && submittedAnswers[i] === correctAnswers[i]) {
          correctCount += 1;
        }
      }
      setTotalCorrect(correctCount);
      setBackup(answersArray);
      setAnswers([]);
      setButton('TRY AGAIN');
      setSubmit(true);
    } if (buttonText === 'TRY AGAIN') {
      setNext(false);
      setHide(true);
      setButton('SUBMIT QUIZ');
      setSelected(0);
      setSubmittedAnswers({});
      setAnswers(backup);
      setIndex(0);
      const question = questionsArray[questionIndex].text;
      setCurrent(question);
      setSubmit(false);
    }
  };
  const selectAnswer = (e) => {
    setSelected(e.target.id);
    const question = questionIndex + 1;
    setSubmittedAnswers({ ...submittedAnswers, [question]: Number(e.target.id) });
  };

  const nextHandler = () => {
    setSelected(0);
    let i = questionIndex;
    if (i < questionsArray.length - 1) {
      setIndex(i += 1);
    }
    if (i === questionsArray.length - 1) {
      setNext(true);
    }
    if (Object.keys(submittedAnswers).length === questionsArray.length) {
      setHide(false);
    }
    // handle the button that moves to the next question
  };
  const backHandler = () => {
    setSelected(0);
    let i = questionIndex;
    if (i > 0) {
      setIndex(i -= 1);
    }
    if (i !== questionsArray.length - 1) {
      setHide(true);
      setNext(false);
    }
    if (Object.keys(submittedAnswers).length === questionsArray.length) {
      setHide(false);
    }
  };
  // handle the button that moves to the previous question

  // Initial Fetch for quiz and associated questions
  useEffect(() => {
    if (toggle) {
      setToggle(false);
      axios.get(`/api/quiz/${quiz_id}`)
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
    if (submittedAnswers[questionIndex + 1]) {
      const s = submittedAnswers[questionIndex + 1];
      setSelected(s);
    }
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
                correctAnswers[questionIndex + 1] = i + 1;
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

  useEffect(() => {
    if (submit) {
      // These if statements are placeholders
      const date = new Date();
      let done = false;
      if (Object.keys(submittedAnswers).length === Object.keys(correctAnswers).length) {
        done = true;
      }
      const statement = `Congratulations! You got ${totalCorrect} out of ${last + 1} answers correct!`;
      setCurrent(statement);
      axios.post('/api/quiz', {
        user_id: user.id,
        quizID: quiz_id,
        numCorrect: totalCorrect,
        totalQuestions: last + 1,
        lastAnswered: questionIndex,
        completed: done,
        dateCompleted: date,
      })
        .then((res) => {
          console.log(res);
        });
    }
  }, [submit]);

  useEffect(() => {
    const data = localStorage.getItem('quizID');
    setQuizID(Number(data));
    setToggle(true);
  });

  // render component:
  return (
    <div style={{
      width: '90%',
      height: '90%',
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
          width: '99%',
          height: '99%',
          position: 'relative',
          marginLeft: '6em',
        }}
      />
      {/* This div hold the question and the chat */}
      <div style={{
        background: '#D6C0E5',
        width: '65em',
        height: '47em',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '15px',
        marginLeft: '5em',
      }}
      >
        {/* This is the question container */}
        <div>
          <div
            style={{
              display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '2em',
            }}
          >
            <Button
              className={hideBack ? 'hide' : ''}
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
            <span
              style={{ marginTop: '15px', color: '#F78670', fontWeight: 'bold' }}
              className={hideNum ? 'hide' : ''}
            >
              {questionIndex + 1}
              {' '}
              /
              {' '}
              {last + 1}
            </span>
            <Button
              className={hideNext ? 'hide' : ''}
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
              {answersArray.map((ele) => {
                const num = answersArray.indexOf(ele) + 1;
                return (
                  <span
                    key={num}
                    id={num}
                    onClick={selectAnswer}
                    style={{ fontSize: '2em' }}
                    className={(num === Number(selected)) ? 'active' : ''}
                  >
                    {' '}
                    {ele.text}
                  </span>
                );
              })}

              {/* Submit Quiz Button */}
              {/* Youll want to hide this one until the last question appears */}
              <Button
                className={hide ? 'hide' : ''}
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
        {/* <div style={{
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
        </div> */}
      </div>
    </div>
  );
}

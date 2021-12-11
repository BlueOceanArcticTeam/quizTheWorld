/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import QuizBackground from './assets/Question.png';
import AppContext from '../../context.js';

export default function QuizPage() {
  // set state variables below:
  const quiz_id = useContext(AppContext);
  const [quizState, setQuiz] = useState();
  const [questionState, setQuestions] = useState();

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
    console.log('works');
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
              Previous
            </Button>
            {/* Span where the current question goes */}
            <span style={{ marginTop: '15px', color: '#F78670', fontWeight: 'bold' }}>13/22</span>
            <Button
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
            <h3 style={{ fontSize: '2em' }}>What kind of potato is best?</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: '23em',
            }}
            >
              <span style={{ fontSize: '2em' }}>- Baked Potato</span>
              <span style={{ fontSize: '2em' }}>- Mashed Potato</span>
              <span style={{ fontSize: '2em' }}>- French Fried</span>
              <span style={{ fontSize: '2em' }}>- Potato Cannon</span>
              {/* Submit Quiz Button */}
              {/* Youll want to hide this one until the last question appears */}
              <Button
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
                Submit Quiz
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

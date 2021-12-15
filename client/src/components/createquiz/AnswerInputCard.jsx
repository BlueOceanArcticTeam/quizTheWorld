/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/function-component-definition */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import QuestionImage from './assets/Question.png';
import gsap, { Power3, Power2 } from 'gsap';
import './CreateQuiz.css';
import {
  Input, FormControl, InputLabel, FormHelperText, Select, MenuItem, Button,
} from '@mui/material';

export default function AnswerInputCard({
  stepCount, setStepCount, answers, setAnswers,
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
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <input
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <input
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <input
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <Button
            onClick={() => { setStepCount(stepCount + 2); }}
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
            onClick={() => { setStepCount(stepCount - 1); }}
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

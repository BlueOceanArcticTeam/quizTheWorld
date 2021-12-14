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

export default function QuestionInputCard({ stepCount, setStepCount }) {
  const [multipleChoiceOrTrueFalse, setMultipleChoiceOrTrueFalse] = useState(null);
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      ease: Power2.out,
      opacity: 1,
      duration: 1.75,
    });
    // Update the document title using the browser API
  }, [stepCount]);

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
          color: 'white', width: '17em', marginBottom: '4em', background: 'none', columnGap: '1.5em', fontSize: '1.5em', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1em',
        }}
        >
          <span>Select Question Type: </span>
          <FormControl variant="filled" sx={{ width: '12em' }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              defaultValue=""
              onChange={(e) => { setMultipleChoiceOrTrueFalse(e.target.value); }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Category"
            >
              <MenuItem value={1}>Multiple Choice</MenuItem>
              <MenuItem value={2}>True / False</MenuItem>
            </Select>
          </FormControl>
          <span>Please input a question: </span>
          <div style={{
            justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '18em', gap: '1.5em',
          }}
          >
            <textarea name="" id="" cols="100" rows="10" maxLength="200" style={{ fontSize: '15px', borderRadius: '15px' }} />
            <Button
              onClick={() => { console.log('works'); setStepCount(stepCount + multipleChoiceOrTrueFalse); }}
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
              onClick={() => { console.log('works'); setStepCount(stepCount - 1); }}
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
    </div>
  );
}

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

export default function TrueFalseSelectCard({
  stepCount, setStepCount, trueFalseAnswer,
  setTrueFalseAnswer, answerGroup, setAnswerGroup,
  setTrueFalseOtherAnswer, trueFalseOtherAnswer,
  setCurrentQuestionId, currentQuestionId,
  setQuestionGroup, questionGroup,
}) {
  const boxRef = useRef(null);
  // eslint-disable-next-line prefer-const
  const [trueFalseArr, setTrueFalseArr] = useState([]);

  useEffect(() => {
    gsap.to(boxRef.current, {
      ease: Power2.out,
      opacity: 1,
      duration: 1.75,
    });
    // Update the document title using the browser API
  }, [stepCount]);

  function updateTrueFalseAnswer(e) {
    let opposite;
    let correctAns;
    if (e.target.value === 'true') {
      opposite = false;
      correctAns = true;
    } else if (e.target.value === 'false') {
      opposite = true;
      correctAns = false;
    }
    setTrueFalseAnswer({
      ...trueFalseAnswer,
      correct: correctAns,
      text: 'True',
    });
    setTrueFalseOtherAnswer({
      ...trueFalseOtherAnswer,
      correct: opposite,
      text: 'False',
    });
    const tfAnswer = {
      ...trueFalseAnswer,
      correct: correctAns,
      text: 'True',
    };
    const tfOtherAnswer = {
      ...trueFalseOtherAnswer,
      correct: opposite,
      text: 'False',
    };
    console.log(tfAnswer, tfOtherAnswer, 'here!');

    setTrueFalseArr((trueFalseArr) => [...trueFalseArr, tfAnswer, tfOtherAnswer]);
  }

  function addAnswerToAnswerGroup() {
    setAnswerGroup((answerGroup) => [...answerGroup, trueFalseArr]);
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
        </div>
        <div style={{
          justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', width: '18em', gap: '1.5em',
        }}
        >
          <FormControl variant="filled" sx={{ width: '12em' }}>
            <InputLabel id="demo-simple-select-label">True / False</InputLabel>
            <Select
              onChange={updateTrueFalseAnswer}
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Category"
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>

            </Select>
          </FormControl>
          <Button
            onClick={() => { setStepCount(stepCount + 1); addAnswerToAnswerGroup(); setCurrentQuestionId(currentQuestionId + 1); }}
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
            onClick={() => { setStepCount(stepCount - 2); setQuestionGroup(questionGroup.filter((item) => item.question_id !== currentQuestionId)); }}
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

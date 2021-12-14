/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import QuestionImage from './assets/Question.png';
import './CreateQuiz.css';
import {
  Input, FormControl, InputLabel, FormHelperText, Select, MenuItem,
} from '@mui/material';
import CategoryDifficultyNameCard from './CategoryDifficulyNameCard.jsx';
import QuestionInputCard from './QuestionInputCard.jsx';
import AnswerInputCard from './AnswerInputCard.jsx';
import TrueFalseSelectCard from './TrueFalseSelectCard.jsx';
import AddAnotherQuestion from './AddAnotherQuestion.jsx';

export default function CreateQuiz() {
  // set state variables below:
  const [inputQuestion, setInputQuestion] = useState(false);
  const [goBackToSelectCategoryDifficultyNameCard, setGoBackToSelectCategoryDifficultyNameCard] = useState(false);
  const [stepCount, setStepCount] = useState(1);
  // component functions - event handlers

  // use Effect:
  useEffect(() => {
    // Update the document title using the browser API
    console.log('happening');
  }, [stepCount]);

  // render component:
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(#6A418A, #930DFF)',
    }}
    >

      {/* If next hasnt been clicked on first modal, display the first modal. When next is clicked, it shows the second modal, input question. */}
      {
        stepCount === 1
          ? <CategoryDifficultyNameCard setStepCount={setStepCount} stepCount={stepCount} />
          : ''
      }
      { stepCount === 2
        ? <QuestionInputCard setStepCount={setStepCount} stepCount={stepCount} />
        : ''}
      { stepCount === 3
        ? <AnswerInputCard setStepCount={setStepCount} stepCount={stepCount} />
        : ''}
      { stepCount === 4
        ? <TrueFalseSelectCard setStepCount={setStepCount} stepCount={stepCount} />
        : ''}
      { stepCount === 5
        ? <AddAnotherQuestion setStepCount={setStepCount} stepCount={stepCount} />
        : ''}

    </div>
  );
}

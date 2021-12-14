/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import gsap, { Power3 } from 'gsap';
import QuestionImage from './assets/Question.png';
import './CreateQuiz.css';
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
  const moveElement = useRef(null);
  // const tween = gsap.to('.cardContainer', {
  //   duration: 4,
  //   x: 750,
  //   rotation: 360,
  //   ease: 'none',
  //   paused: true,
  // });
  // component functions - event handlers

  // use Effect:
  // useEffect(() => {
  //   tween.play();
  //   // Update the document title using the browser API
  //   console.log('happening', moveElement);
  // });

  // render component:
  return (
    <div style={{
      width: '100%',
      height: '77vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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

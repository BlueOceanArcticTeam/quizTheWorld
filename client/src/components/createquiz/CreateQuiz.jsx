/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import gsap, { Power3 } from 'gsap';
import { AppContext } from '../../App.jsx';
import QuestionImage from './assets/Question.png';
import './CreateQuiz.css';
import CategoryDifficultyNameCard from './CategoryDifficulyNameCard.jsx';
import QuestionInputCard from './QuestionInputCard.jsx';
import AnswerInputCard from './AnswerInputCard.jsx';
import TrueFalseSelectCard from './TrueFalseSelectCard.jsx';
import AddAnotherQuestion from './AddAnotherQuestion.jsx';

export default function CreateQuiz() {
  const { user } = useContext(AppContext);
  // set state variables below:
  const [inputQuestion, setInputQuestion] = useState(false);
  const [goBackToSelectCategoryDifficultyNameCard, setGoBackToSelectCategoryDifficultyNameCard] = useState(false);
  const [stepCount, setStepCount] = useState(1);
  const moveElement = useRef(null);
  const [quiz, setQuiz] = useState({
    category: '',
    difficulty: '',
    title: '',
    source: null, // This is the user_id
    dateCreated: new Date(),
    numSubmissions: 0,
  });
  const [answers, setAnswers] = useState({
    question_id: null, // unique hashing function
    correct: false,
    text: '',
  });
  const [question, setQuestion] = useState({
    user_id: null,
    quiz_id: null,
    text: '',
    questionType: '',
  });
  const [questionGroup, setQuestionGroup] = useState([]);
  const [answerGroup, setAnswerGroup] = useState([]);
  // component functions - event handlers

  // use Effect:
  useEffect(() => {
    console.log('happening', quiz);
  }, [quiz]);

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
          ? <CategoryDifficultyNameCard setStepCount={setStepCount} stepCount={stepCount} setQuiz={setQuiz} quiz={quiz} />
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
      {
        user
          ? <div>{question.user_id}</div>
          : ''
      }
    </div>
  );
}

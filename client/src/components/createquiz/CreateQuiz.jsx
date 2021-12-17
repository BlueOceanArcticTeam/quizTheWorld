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
  const [quizId, setQuizId] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [quiz, setQuiz] = useState({
    title: '',
    category: '',
    difficulty: '',
    source: null, // This is the user_id
    dateCreated: new Date(),
    numSubmissions: 0,
  });
  const [trueFalseAnswer, setTrueFalseAnswer] = useState({
    question_id: 0,
    type: 'TF',
    correct: null,
    text: 'True',
  });
  const [trueFalseOtherAnswer, setTrueFalseOtherAnswer] = useState({
    question_id: 0,
    type: 'TF',
    correct: null,
    text: 'True',
  });
  const [answers, setAnswers] = useState({
    question_id: 0,
    correct: null,
    A: '',
    B: '',
    C: '',
    D: '',
  });
  const [question, setQuestion] = useState({
    questionId: 0,
    user_id: null,
    quiz_id: null,
    text: '',
    questionType: '',
  });

  // loop over questionGroup
  // for each question
  // change quiestionId of to backend Id

  const [questionGroup, setQuestionGroup] = useState([]);
  const [answerGroup, setAnswerGroup] = useState([]);
  // component functions - event handlers

  // useEffect(() => {
  //   console.log(question, 'CURRENT QUESTION');
  // }, [question]);

  // useEffect(() => {
  //   console.log(questionGroup, '}---***---{ QUESTION GROUP');
  // }, [questionGroup]);

  // useEffect(() => {
  //   console.log(answers, 'CURRENT ANSWERS');
  // }, [answers]);

  // useEffect(() => {
  //   console.log(currentQuestionId, 'CURRENT QUESTION ID');
  // }, [currentQuestionId]);

  // useEffect(() => {
  //   console.log(answerGroup, 'ANSWER GROUP');
  // }, [answerGroup]);

  // useEffect(() => {
  //   console.log(trueFalseAnswer, 'TRUE/FALSE ANSWER');
  // }, [trueFalseAnswer]);

  // useEffect(() => {
  //   console.log(trueFalseOtherAnswer, 'TRUE/FALSE OTHER');
  // }, [trueFalseOtherAnswer]);

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
        ? (
          <QuestionInputCard
            setStepCount={setStepCount}
            stepCount={stepCount}
            setQuestion={setQuestion}
            setQuestionGroup={setQuestionGroup}
            questionGroup={questionGroup}
            question={question}
            setCurrentQuestionId={setCurrentQuestionId}
            currentQuestionId={currentQuestionId}
            setAnswers={setAnswers}
            answers={answers}
            trueFalseAnswer={trueFalseAnswer}
            setTrueFalseAnswer={setTrueFalseAnswer}
            trueFalseOtherAnswer={trueFalseOtherAnswer}
            setTrueFalseOtherAnswer={setTrueFalseOtherAnswer}
          />
        )
        : ''}
      { stepCount === 3
        ? (
          <AnswerInputCard
            setStepCount={setStepCount}
            stepCount={stepCount}
            answers={answers}
            setAnswers={setAnswers}
            question={question}
            setQuestion={setQuestion}
            currentQuestionId={currentQuestionId}
            setCurrentQuestionId={setCurrentQuestionId}
            answerGroup={answerGroup}
            setAnswerGroup={setAnswerGroup}
            setQuestionGroup={setQuestionGroup}
            questionGroup={questionGroup}
          />
        )
        : ''}
      { stepCount === 4
        ? (
          <TrueFalseSelectCard
            setStepCount={setStepCount}
            stepCount={stepCount}
            trueFalseAnswer={trueFalseAnswer}
            setTrueFalseAnswer={setTrueFalseAnswer}
            trueFalseOtherAnswer={trueFalseOtherAnswer}
            setTrueFalseOtherAnswer={setTrueFalseOtherAnswer}
            answerGroup={answerGroup}
            setAnswerGroup={setAnswerGroup}
            setCurrentQuestionId={setCurrentQuestionId}
            currentQuestionId={currentQuestionId}
            setQuestionGroup={setQuestionGroup}
            questionGroup={questionGroup}
          />
        )
        : ''}
      { stepCount === 5
        ? (
          <AddAnotherQuestion
            setStepCount={setStepCount}
            stepCount={stepCount}
            quiz={quiz}
            answers={answers}
            question={question}
            setQuestion={setQuestion}
            setQuestionGroup={setQuestionGroup}
            setAnswerGroup={setAnswerGroup}
            answerGroup={answerGroup}
            questionGroup={questionGroup}
            quizId={quizId}
            setQuizId={setQuizId}
            currentQuestionId={currentQuestionId}
            setCurrentQuestionId={setCurrentQuestionId}
          />
        )
        : ''}
    </div>
  );
}

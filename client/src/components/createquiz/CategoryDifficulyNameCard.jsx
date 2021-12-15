/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/function-component-definition */
import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import gsap, { Power3, Power2 } from 'gsap';
import { AppContext } from '../../App.jsx';
import QuestionImage from './assets/Question.png';
import './CreateQuiz.css';
import {
  Input, FormControl, InputLabel, FormHelperText, Select, MenuItem, Button,
} from '@mui/material';
import {
  Link,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

export default function CategoryDifficultyNameCard({
  stepCount, setStepCount, quiz, setQuiz,
}) {
  const { user } = useContext(AppContext);
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      ease: Power2.out,
      opacity: 1,
      duration: 1.75,
    });
    // Update the document title using the browser API
  }, [stepCount]);

  function updateQuizCat(e) {
    setQuiz({
      ...quiz,
      source: user.id,
      category: e.target.value,
    });
  }

  function updateQuizDif(e) {
    setQuiz({
      ...quiz,
      difficulty: e.target.value,
    });
  }

  function updateQuizName(e) {
    setQuiz({
      ...quiz,
      title: e.target.value,
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
          <span>Select a category for your quiz: </span>
          <span>Select quiz difficulty: </span>
          <span>Enter your quiz name: </span>
        </div>
        <div style={{
          justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection: 'column', width: '18em', gap: '1.5em', marginRight: '7em',
        }}
        >
          <FormControl variant="filled" sx={{ width: '12em' }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              onChange={updateQuizCat}
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Category"
            >
              <MenuItem value="General Knowledge">General Knowledge</MenuItem>
              <MenuItem value="Animals">Animals</MenuItem>
              <MenuItem value="Geography">Geography</MenuItem>
              <MenuItem value="Entertainment: Film">Entertainment: Film</MenuItem>
              <MenuItem value="Science & Nature">Science & Nature</MenuItem>
              <MenuItem value="Mythology">Mythology</MenuItem>
              <MenuItem value="Entertainment: Books">Entertainment: Books</MenuItem>
              <MenuItem value="Entertainment: Music">Entertainment: Music</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: '15em' }}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              onChange={updateQuizDif}
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Difficulty"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <input
            onChange={updateQuizName}
            type="text"
            className="input"
            style={{
              height: '55px', size: '150', fontSize: '3em', width: '8em', borderRadius: '10px', border: 'none',
            }}
          />
          <Button
            onClick={() => { console.log('works'); setStepCount(stepCount + 1); }}
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
            to="/"
            component={Link}
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
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

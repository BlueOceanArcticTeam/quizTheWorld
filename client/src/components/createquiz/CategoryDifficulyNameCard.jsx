/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/function-component-definition */
import React, { useState, useContext, useEffect } from 'react';
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

export default function CategoryDifficultyNameCard({ stepCount, setStepCount }) {
  return (

    <div id="cardContainer">
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Category"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: '15em' }}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Difficulty"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <input
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

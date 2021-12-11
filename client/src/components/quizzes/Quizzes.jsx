/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppContext from '../../context.js';
import QuizBackground from './assets/Question.png';
import './Quizzes.css';

export default function Quizzes() {
  // set state variables below:

  // The idea here is that when you click on a quiz from the homepage it will pass the ID down
  // to this component and that can be used to populate the quiz questions and answers
  // component functions - event handlers

  // use Effect:
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
      <div style={{
        background: '#D6C0E5', width: '85em', height: '47em', position: 'absolute', marginTop: '5em',
      }}
      >
        <div style={{ width: '20em', height: '25em', background: 'purple' }}>
          Hello
        </div>
      </div>
    </div>
  );
}

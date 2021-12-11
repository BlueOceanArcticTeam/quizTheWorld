/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import QuestionImage from './assets/Question.png';

export default function CreateQuiz() {
  // set state variables below:

  // component functions - event handlers

  // use Effect:

  // render component:
  return (
    <div tyle={{
      width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'top',
    }}
    >
      <img
        src={QuestionImage}
        alt=""
        style={{
          zIndex: '-100',
          width: '100vw',
          height: '100vh',
          position: 'absolute',
        }}
      />
    </div>
  );
}

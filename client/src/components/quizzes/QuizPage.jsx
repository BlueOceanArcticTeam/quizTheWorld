/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';

export default function QuestionWidget() {
  // set state variables below:

  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE
  // THIS PAGE IS NOT A REAL PAGE

  const { currentQuestion, answers } = useContext(AppContext);
  const [selected, setSelected] = useState();

  const nextHandler = () => {
    // handle the button that moves to the next question
  };

  const backHandler = () => {
    // handle the button that moves to the previous question
  };
  // use Effect:

  // render component:
  return (
    <div>
      Example
    </div>
  );
}

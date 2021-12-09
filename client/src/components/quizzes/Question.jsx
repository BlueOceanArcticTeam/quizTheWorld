/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';

export default function QuestionWidget() {
  // set state variables below:
  const { currentQuestion, answers } = useContext(AppContext);
  const [selected, setSelected] = useState();

  // component functions - event handlers
  const selectAnswer = () => {
    // handle clicking on an answer to select it
  };

  // use Effect:

  // render component:
  return (
    <div>
      Example
    </div>
  );
}

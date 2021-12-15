/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import './nopath.css';

export default function NoPath() {
  // set state variables below:

  // component functions - event handlers
  const wrongPage = () => {
    const arr = ['I \'Knows\' not where you are going', 'wait a second... this isnt a quiz...', 'How did you get here?  This is not a page you should be at'];
    return arr[Math.floor(Math.random() * arr.length)];
  };
  // use Effect:

  // render component:
  return (
    <div className="homeContainer">
      <div className="heroSectionContainer">
        <div className="heroSectionContainerInner">
          <div className="heroTextGrid" style={{ fontWeight: 'bold' }}>
            { wrongPage() }
          </div>
          <div className="heroTextImage" />
        </div>
        <div className="heroSectionSlider">
          <div className="heroSectionSliderText" style={{ fontWeight: 'medium' }}>
            please return home
          </div>
        </div>
      </div>
    </div>
  );
}

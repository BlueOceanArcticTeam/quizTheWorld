/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import './homepage.css';
import placehold from './Assets/placehold.png';
import NavBar from '../helperComponents/NavBar.jsx';
import './homepage.css';


export default function HomePage() {
  return (
    <div className="homeContainer">
      <div className="heroSectionContainer">
        <div className="heroSectionContainerInner">
          <div className="heroTextGrid" style={{ fontWeight: 'bold' }}>
            Welcome to QuizKnows!
            <br />
            When you’re hungry..
            <br />
            for KNOWLEDGE
          </div>
          <div className="heroTextImage">
            <img src={placehold} alt="HeroImage" style={{ height: '35vh' }} />
          </div>

        </div>
        <div className="heroSectionSlider">
          <div className="heroSectionSliderText" style={{ fontWeight: 'bold' }}>
            Check out some of our most popular quizzes or..
            <Button
              variant="contained"
              sx={{
                fontSize: '1.5rem',
                background: 'linear-gradient(#F06E0E, #DE8D2F)',
                textDecoration: 'none',
                marginLeft: '1.25rem',
                borderRadius: 4,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
              }}
            >
              Create Your Own!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

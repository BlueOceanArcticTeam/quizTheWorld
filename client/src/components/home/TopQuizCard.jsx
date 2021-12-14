import React from 'react';
import './homepage.css';
import { getTypographyUtilityClass } from '@mui/material';
import AnimalsLogo from './Assets/AnimalsLogo.png';
import FilmLogo from './Assets/FilmLogo.png';
import GenKnowl from './Assets/GenKnowl.png';
import Geography from './Assets/Geography.png';
import Mythology from './Assets/Mythology.png';
import SNLogo from './Assets/SNLogo.png';

const TopQuizCard = function ({ title, category }) {
  let bgStyle;
  let fontColor;
  if (category === 'General Knowledge') {
    bgStyle = GenKnowl;
    fontColor = 'white';
  } else if (category === 'Animals') {
    bgStyle = AnimalsLogo;
  } else if (category === 'Geography') {
    bgStyle = Geography;
  } else if (category === 'Entertainment: Film') {
    bgStyle = FilmLogo;
  } else if (category === 'Science & Nature') {
    bgStyle = SNLogo;
  } else if (category === 'Mythology') {
    bgStyle = Mythology;
  }
  return (
    <div
      className="quizCardBox"
      style={{
        backgroundImage: `url(${bgStyle})`, backgroundSize: 'cover', color: 'orange', fontWeight: 'bold',
      }}
    >
      <h4 style={{ fontWeight: 'bold' }}>{title}</h4>
    </div>
  );
};

export default TopQuizCard;

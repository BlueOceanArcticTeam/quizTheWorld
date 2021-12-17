import React from 'react';
import './homepage.css';
import { Link } from 'react-router-dom';
import { getTypographyUtilityClass } from '@mui/material';
import AnimalSm from './Assets/AnimalSm.png';
import AnimalMd from './Assets/AnimalMd.png';
import AnimalLg from './Assets/AnimalLg.png';
import GeoSm from './Assets/GeoSm.png';
import GeoMd from './Assets/GeoMd.png';
import GeoLg from './Assets/GeoLg.png';
import GKSm from './Assets/GKSm.png';
import GKMd from './Assets/GKMd.png';
import GKLg from './Assets/GKLg.png';
import MovieSm from './Assets/MovieSm.png';
import MovieMd from './Assets/MovieMd.png';
import MovieLg from './Assets/MovieLg.png';
import MythSm from './Assets/MythSm.png';
import MythMd from './Assets/MythMd.png';
import MythLg from './Assets/MythLg.png';
import SciSm from './Assets/SciSm.png';
import SciMd from './Assets/SciMd.png';
import SciLg from './Assets/SciLg.png';
import BookLg from './Assets/BookLg.png';
import MusicLg from './Assets/MusicLg.png';

const TopQuizCard = function ({ title, category, quizId }) {
  const handleClick = function () {
    localStorage.setItem('quizID', quizId);
  };
  let bgStyle;
  if (category === 'General Knowledge') {
    bgStyle = GKLg;
  } else if (category === 'Animals') {
    bgStyle = AnimalLg;
  } else if (category === 'Geography') {
    bgStyle = GeoLg;
  } else if (category === 'Entertainment: Film') {
    bgStyle = MovieLg;
  } else if (category === 'Science & Nature') {
    bgStyle = SciLg;
  } else if (category === 'Mythology') {
    bgStyle = MythLg;
  } else if (category.includes('Music')) {
    bgStyle = MusicLg;
  } else if (category.includes('Book')) {
    bgStyle = BookLg;
  }
  return (
    <div
      className="quizCardBox"
      onClick={handleClick}
      style={{
        backgroundImage: `url(${bgStyle})`, backgroundSize: 'cover', fontWeight: 'bold', border: '1px solid purple',
      }}
    >
      <Link
        style={{
          textDecoration: 'none', color: '#FFDAD1',
        }}
        to="/quizzes/quiz"
      >
        <h4 style={{ fontWeight: 'bold', color: '#FFDAD1' }}>{title}</h4>
      </Link>
    </div>
  );
};

export default TopQuizCard;

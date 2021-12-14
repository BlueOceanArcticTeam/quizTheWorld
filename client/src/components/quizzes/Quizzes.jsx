/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  FormControl, InputLabel, Select, MenuItem, MenuIcon,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuizBackground from './assets/Question.png';
import './Quizzes.css';

export default function Quizzes() {
  // set state variables below:
  const fakeData = ['https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80', 'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    'https://images.unsplash.com/photo-1627856014754-2907e2355d34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2047&q=80'];
  const [difficultyQuizzes, setDQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [toggle, setToggle] = useState(true);

  const pageLink = (e) => {
    localStorage.setItem('quizID', e.target.id);
  };

  // use Effect:
  useEffect(() => {
    if (toggle) {
      setToggle(false);
      axios.get(`/api/quizzes/${difficulty}`)
        .then((res) => {
          const { data } = res;
          for (let i = 0; i < data.length; i += 1) {
            data[i].url = fakeData[i];
          }
          setDQuizzes(data);
        });
    }
  });
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
      {/* This is the Arrows for back and forward */}
      <ArrowBackIosIcon style={{
        position: 'absolute',
        fontSize: '100px',
        color: 'white',
        left: '10%',
        top: '52vh',
      }}
      />
      <ArrowForwardIosIcon style={{
        position: 'absolute',
        fontSize: '100px',
        color: 'white',
        right: '10%',
        top: '52vh',
      }}
      />
      {/* This div contains all of the image tiles */}
      <div style={{
        background: 'none',
        width: '70vw',
        height: '42em',
        position: 'absolute',
        marginTop: '5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        {/* This is for the category and difficulty Selectors */}
        <div style={{ display: 'flex', width: '28vw', justifyContent: 'space-between' }}>
          <FormControl variant="filled" sx={{ width: '15em' }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              defaultValue=""
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
        </div>
        {/* First Image Row Container */}
        <div style={{
          width: '60vw', height: '25em', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          {/* First Row Images Mapped Here:  */}
          {
            fakeData.map((image) => (
              <img
                className="coverImages"
                src={image}
                alt="quizImages"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
              />
            ))
          }
        </div>
        {/* Second Row Images Container */}
        {/* <div style={{ width: '70vw', border: '2px solid orange' }} /> */}
        <div style={{
          width: '60vw', height: '25em', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          {/* Second Row of Images Here: */}
          {
            difficultyQuizzes.map((ele) => (
              <Link to={{
                pathname: '/quizzes/quiz/',
              }}
              >
                <img
                  onClick={pageLink}
                  key={ele.id}
                  id={ele.id}
                  className="coverImages"
                  src={ele.url}
                  alt="quizImages"
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                />
              </Link>
            ))
          }
        </div>

      </div>
    </div>
  );
}

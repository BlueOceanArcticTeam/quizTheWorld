/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import './homepage.css';
import Container from '@mui/material/Container';
import axios from 'axios';
import { Link } from 'react-router-dom';
import placehold from './Assets/placehold.png';
import TopQuizSlider from './TopQuizSlider.jsx';
import TopQuizCard from './TopQuizCard.jsx';
import NavBar from '../helperComponents/NavBar.jsx';
import LevelUp from '../helperComponents/Search.jsx';

export default function HomePage() {
  const [data, setData] = useState();
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (toggle) {
      axios.get('/api/topQuizzes')
        .then((resp) => {
          setData(resp.data);
          setToggle(false);
        });
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="test">
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
              <img src={placehold} alt="HeroImage" style={{ height: 'auto', width: '100%' }} />
            </div>
          </div>
          <div className="heroSectionSlider">
            <div className="heroSectionSliderText" style={{ fontWeight: 'bold' }}>
              Check out some of our most popular quizzes or..
              <Link
                style={{
                  textDecoration: 'none',
                }}
                to="/quizzes/create"
              >
                <Button
                  className="createYourOwn"
                  variant="contained"
                  sx={{
                    fontSize: '1.5rem',
                    background: 'linear-gradient(#F06E0E, #DE8D2F)',
                    textDecoration: 'none',
                    marginLeft: '1.25rem',
                    borderRadius: 4,
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    height: 'auto',
                    overflow: 'hidden',
                    width: '25%',
                    transition: 'box-shadow .3s',
                  }}
                >
                  Create Your Own!
                </Button>

              </Link>
              <div
                className="heroSlider"
                style={{
                  display: 'flex', alignItems: 'stretch', margin: '2.5%', width: '95%', justifyContent: 'center',
                }}
              >
                {data ? data.map((item) => <TopQuizCard title={item.title} category={item.category} quizId={item.id} key={item.title} />) : null}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

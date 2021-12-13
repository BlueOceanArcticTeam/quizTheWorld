/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import NewCard from './NewCard.jsx';
import RenderFriend from './RenderFriend.jsx';
import './profilepage.css';
import placehold from '../home/Assets/placehold.png';
import { autocompleteClasses } from '@mui/material';
import { AppContext } from '../../App.jsx';

export default function ProfilePage() {
  const { user, friends, userID } = useContext(AppContext);

  const [userMetaData, setUserMetaData] = useState({});
  const [lastQuiz, setLastQuiz] = useState();

  function fetchUserMetaData() {
    axios
      .get(`/api/profile/${userID}/meta`)
      .then((data) => {
        setUserMetaData(data.data);
        setLastQuiz(data.data.data[0].title);
      });
  }

  // use effect - load data when rendering the page
  useEffect(() => {
    // get user meta data
    fetchUserMetaData();
  }, []);

  console.log(friends);
  return (
    <div className="mainProfileContainer">
      <div className="infoContainer">
        <div style={{ fontWeight: 'bold' }}>
          Profile
          <br />
          <div className="info">
            <img
              src={placehold}
              alt="ProfilePicture"
              style={{
                height: '7vh', width: '7vw', margin: 'auto', paddingBottom: '2rem', borderRadius: '100%',
              }}
            />
            <div className="key">
              Screen Name
            </div>
            <div className="property">
              {`${user.username}`}
            </div>
            <div className="key">
              Full Name
            </div>
            <div className="property">
              {`${user.firstname} ${user.lastname}`}
            </div>
            <div className="key">
              Email
            </div>
            <div className="property">
              {`${user.email}`}
            </div>
          </div>
        </div>
      </div>
      <div className="statsContainer">
        <div style={{ fontWeight: 'bold' }}>
          Quiz Overview
        </div>
        <div className="cards">
          <div>
            {NewCard('Quizzes Taken', `${userMetaData.count}`)}
          </div>
          <div>
            {NewCard('Average', `${userMetaData.average}%`)}
          </div>
          <div>
            {NewCard('Last Quiz Taken', `${lastQuiz}`)}
          </div>
        </div>
        <div className="infoChart">
          <div style={{ fontWeight: 'bold' }}>
            Average Score Over Career
          </div>
          <div>
            chart goes here
          </div>
        </div>
      </div>
      <div className="friendsContainer">
        <div style={{ fontWeight: 'bold' }}>
          Friends
        </div>
        {friends.map((friend, index) => (
          <div key={index}>
            {RenderFriend(friend)}
          </div>
        ))}
      </div>
    </div>
  );
}

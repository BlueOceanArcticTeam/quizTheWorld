/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { autocompleteClasses } from '@mui/material';
import { CategoryScale } from 'chart.js';
import NewCard from './NewCard.jsx';
import RenderFriend from './RenderFriend.jsx';
import './profilepage.css';
import placehold from '../home/Assets/placehold.png';
import { AppContext } from '../../App.jsx';
import UserChart from './UserChart.jsx';
import NoPath from '../nopath/NoPath.jsx';

export default function ProfilePage() {
  const {
    goToHome, render, userID, isLoggedIn,
  } = useContext(AppContext);
  const { user_id } = useParams();

  const [userMetaData, setUserMetaData] = useState({});
  const [lastQuiz, setLastQuiz] = useState();
  const [userId, setUserId] = useState(user_id);
  const [userFriends, setUserFriends] = useState([]);
  const [userData, setUserData] = useState();
  const [userExist, setUserExist] = useState(true);
  const [friendAdded, setFriendAdded] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Score',
        data: [],
        backgroundColor: [
          '#ffbb11',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
      },
    ],
  });

  if (user_id !== userId) {
    setUserId(user_id);
  }

  function fetchUserFriends() {
    axios
      .get(`/api/profile/${userId}/friends`)
      .then((data) => {
        setUserFriends(data.data.rows);
      });
  }

  function fetchUserMetaData() {
    axios
      .get(`/api/profile/${userId}/meta`)
      .then((data) => {
        setUserMetaData(data.data);
        if (data.data.count > 0) {
          setLastQuiz(data.data.data[data.data.data.length - 1].title);
          setChartData({
            labels: data.data.data.map((quiz) => quiz.title),
            datasets: [
              {
                label: 'Score',
                data: data.data.data.map((quiz) => quiz.score),
                backgroundColor: [
                  '#FE6845',
                ],
              },
            ],
          });
        } else {
          setLastQuiz();
          setChartData({
            labels: [],
            datasets: [
              {
                label: 'Score',
                data: [],
                backgroundColor: [
                  '#ffbb11',
                  '#ecf0f1',
                  '#50AF95',
                  '#f3ba2f',
                  '#2a71d0',
                ],
              },
            ],
          });
        }
      });
  }

  function fetchUserData() {
    if (!isNaN(user_id)) {
      axios
        .get(`/api/profile/${userId}`)
        .then((data) => {
          setUserData(data.data[0]);
          fetchUserFriends();
          fetchUserMetaData();
        })
        .catch((err) => {
          console.log('big error time');
        });
    }
  }

  function addFriend() {
    if (isLoggedIn) {
      axios
        .post(`/api/profile/${userID}/friends/${userId}`, null, {
          params: {
            user_id: userID,
            friend_id: userId,
          },
        })
        .then((response) => response.status)
        .catch((err) => console.warn(err));
      setFriendAdded(true);
    }
  }

  // use effect - load data when rendering the page
  useEffect(() => {
    // get user meta data
    fetchUserData();
  }, [userId, render, friendAdded]);

  return (
    userData
      ? (
        <div className="mainProfileContainer">
          <div className="infoContainer">
            <div style={{ fontWeight: 'bold' }}>
              Profile
              <br />
              <div className="info">
                <img
                  src={userData.thumbnail_url === null || userData.thumbnail_url === 'null' ? placehold : userData.thumbnail_url}
                  alt="ProfilePicture"
                  style={{
                    margin: 'auto', borderRadius: '100%',
                  }}
                  id="profilepic"
                />
                <div className="key">
                  Screen Name
                </div>
                <div className="property">
                  {`${userData.username}`}
                </div>
                <div className="key">
                  Full Name
                </div>
                <div className="property">
                  {`${userData.firstname} ${userData.lastname}`}
                </div>
                { userData.id === userID || isLoggedIn === false ? null : <button type="button" id="profilepageaddfriend" onClick={addFriend}>Add Friend</button>}
              </div>
            </div>
          </div>
          <div className="statsContainer">
            <div style={{ fontWeight: 'bold' }}>
              Quiz Overview
            </div>
            <div className="cards">
              <div>
                {NewCard('Quizzes Taken', userMetaData.count > 0 ? `${userMetaData.count}` : '')}
              </div>
              <div>
                {NewCard('Average', userMetaData.average ? `${userMetaData.average}%` : '')}
              </div>
              <div>
                {NewCard('Last Quiz Taken', lastQuiz ? `${lastQuiz}` : '')}
              </div>
            </div>
            <div className="infoChart">
              <div style={{ fontWeight: 'bold' }}>
                Quiz Scores
              </div>
              <div id="userchartcontainer">
                <UserChart data={chartData} />
              </div>
            </div>
          </div>
          <div className="friendsContainer">
            <div style={{ fontWeight: 'bold' }}>
              Friends
            </div>
            {userFriends.map((friend, index) => (
              <Link
                style={{
                  color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
                }}
                to={`/profile/${friend.id}`}
                key={index}
                onClick={() => { setUserId(friend.id); }}
              >
                {RenderFriend(friend, index)}
              </Link>
            ))}
          </div>
        </div>
      )
      : <NoPath />
  );
}

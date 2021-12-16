/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

export default function ProfilePage() {
  const { user_id } = useParams();

  const [userMetaData, setUserMetaData] = useState({});
  const [lastQuiz, setLastQuiz] = useState();
  const [userId, setUserId] = useState(user_id);
  const [userFriends, setUserFriends] = useState([]);
  const [userData, setUserData] = useState({});
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
    axios
      .get(`/api/profile/${userId}`)
      .then((data) => {
        setUserData(data.data[0]);
      })
      .catch((err) => {
        throw err;
      });
    axios
      .get(`/api/profile/${userId}/friends`)
      .then((data) => {
        setUserFriends(data.data.rows);
      });
  }

  // use effect - load data when rendering the page
  useEffect(() => {
    // get user meta data
    fetchUserMetaData();
  }, [userId]);

  return (
    <div className="mainProfileContainer">
      <div className="infoContainer">
        <div style={{ fontWeight: 'bold' }}>
          Profile
          <br />
          <div className="info">
            <img
              src={userData.thumbnail_url === 'null' ? placehold : userData.thumbnail_url}
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
            <div className="key">
              Email
            </div>
            <div className="property">
              {`${userData.email}`}
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
            {NewCard('Quizzes Taken', `${userMetaData.count}` || '')}
          </div>
          <div>
            {NewCard('Average', userMetaData.average ? `${userMetaData.average}%` : '')}
          </div>
          <div>
            {NewCard('Last Quiz Taken', `${lastQuiz || ''}`)}
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
  );
}

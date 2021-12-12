/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NewCard from './NewCard.jsx';
import RenderFriend from './RenderFriend.jsx';
import './profilepage.css';
import placehold from '../home/Assets/placehold.png';
import { autocompleteClasses } from '@mui/material';

export default function ProfilePage() {
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
              Jimmy Joe Joe
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
            {NewCard()}
          </div>
          <div>
            {NewCard()}
          </div>
          <div>
            {NewCard()}
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
        {RenderFriend()}
        {RenderFriend()}
        {RenderFriend()}
        {RenderFriend()}
        {RenderFriend()}
        {RenderFriend()}
        {RenderFriend()}
      </div>
    </div>
  );
}

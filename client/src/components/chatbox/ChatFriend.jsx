/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState, useContext, useEffect } from 'react';
import '../profile/profilepage.css';
import placehold from '../home/Assets/placehold.png';

const ChatFriend = (friend) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '2rem' }}>
      <img src={placehold} style={{ width: '3vw' }} />
      <span className="friendsListText">
        <div>
          {friend.username}
        </div>
        <div>
          {`${friend.firstname} ${friend.lastname}`}
        </div>
      </span>
    </div>
  );
};

export default ChatFriend;

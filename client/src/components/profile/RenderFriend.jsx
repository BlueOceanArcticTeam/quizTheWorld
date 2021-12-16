import React, { useState, useContext, useEffect } from 'react';
import './profilepage.css';
import placehold from '../home/Assets/placehold.png';
import { AppContext } from '../../App.jsx';

const RenderFriend = function (friend, index) {
  return (
    <div key={index} style={{ display: 'flex', alignItems: 'center', paddingTop: '2rem' }}>
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

export default RenderFriend;

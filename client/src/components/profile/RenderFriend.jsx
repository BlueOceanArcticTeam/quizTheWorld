import React, { useState, useContext, useEffect } from 'react';
import './profilepage.css';
import placehold from '../home/Assets/placehold.png';
import { AppContext } from '../../App.jsx';

const RenderFriend = function (friend, index, use) {
  return (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
      <img src={friend.thumbnail_url === 'null' || friend.thumbnail_url === null ? placehold : friend.thumbnail_url} style={{ width: '3vw' }} />
      <span className={use === 'search' ? 'searchListText' : 'friendsListText'}>
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

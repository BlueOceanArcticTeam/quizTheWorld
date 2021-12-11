import React, { useState, useContext, useEffect } from 'react';
import './profilepage.css';
import placehold from '../home/Assets/placehold.png';

const RenderFriend = function () {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '2rem' }}>
      <img src={placehold} style={{ width: '3vw' }} />
      <span className="friendsListText">
        Name Here
      </span>
    </div>
  );
};

export default RenderFriend;

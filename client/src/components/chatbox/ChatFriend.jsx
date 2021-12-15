/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../App.jsx';
import '../profile/profilepage.css';
import placehold from '../home/Assets/placehold.png';

const ChatFriend = ({ friend }) => {
  const { setRecipientID, setDisplayChat, setDisplayChatFriendList } = useContext(AppContext);

  const handleChatClick = () => {
    setRecipientID(friend.id);
    setDisplayChatFriendList(false);
    setDisplayChat(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem' }}>
      <img src={placehold} style={{ width: '3vw' }} />
      <span className="friendsListText">
        <div>
          {`${friend.firstname} ${friend.lastname}`}
        </div>
      </span>
      <button className="chatWithFriendButton" onClick={handleChatClick}>Chat</button>
    </div>
  );
};

export default ChatFriend;

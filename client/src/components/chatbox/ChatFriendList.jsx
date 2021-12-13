/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { AppContext } from '../../App.jsx';

const ChatFriendList = () => {
  const { friends } = useContext(AppContext);

  // HELPER FUNCTIONS
  const handleChatWithFriendClick = () => {};

  return (
    <div className="chatFriendListContainer">
      My Friends
      <button className="chatWithFriendButton">Chat</button>
      {friends.map((friend) => { return friend.toString(); })}
    </div>
  );
};

export default ChatFriendList;

/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { AppContext } from '../../App.jsx';
import ChatFriend from './ChatFriend.jsx';

const ChatFriendList = () => {
  const { friends } = useContext(AppContext);

  // HELPER FUNCTIONS
  return (
    <div className="chatFriendListContainer">
      My Friends
      {friends.map((friend) => { return <ChatFriend friend={friend} key={friend.id} />; })}
    </div>
  );
};

export default ChatFriendList;

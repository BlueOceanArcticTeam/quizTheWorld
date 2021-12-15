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
      <h4 className="chatFriendListTitle">My Friends</h4>
      <div className="chatFriendList">
        <div className="chatFriendTile">
          {friends.map((friend) => { return <ChatFriend friend={friend} key={friend.id} />; })}
        </div>
      </div>
    </div>
  );
};

export default ChatFriendList;

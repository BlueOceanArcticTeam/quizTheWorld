import React from 'react';
import Chat from './Chat.jsx';
import FriendList from '../friendlist/FriendList.jsx';

const ChatPage = () => {
  return (
    <div className="chatPage">
      <Chat />
      {/* TODO: Make userID dynamic */}
      <FriendList userID={1} />
    </div>
  );
};

export default ChatPage;

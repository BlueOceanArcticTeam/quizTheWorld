/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import Chat from './Chat.jsx';
import FriendList from '../profile/FriendsList.jsx';
import { UserIDContext } from '../../App.jsx';

const ChatPage = () => {
  return (
    <div className="chatPage">
      <UserIDContext.Consumer>
        {(context) => {
          return (
            <div>
              <p>ID----------------: {context}</p>
              <Chat userID={context} />
              <FriendList />
            </div>
          );
        }}
      </UserIDContext.Consumer>
    </div>
  );
};

export default ChatPage;

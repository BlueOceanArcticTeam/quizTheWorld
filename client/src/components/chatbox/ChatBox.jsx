/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { getUserName } from './chatBoxHelperFunctions.js';
import MessageTile from './MessageTile.jsx';

export default function ChatBox({ recipientID }) {
  // set state variables below:
  const [chatBoxActive, setChatBoxActive] = useState(false);
  const [messsageHistory, setMessageHistory] = useState([]);
  // component functions - event handlers
  const handleChatBoxClick = () => { setChatBoxActive(!chatBoxActive); };
  const getMessageHistory = () => {
    axios.get('http://localhost:3000/messages', {})
      .then()
    setMessageHistory([]);
  };
  // use Effect:
  useEffect(() => { getMessageHistory(); }, []);

  // render component:
  return (
    <div className="chatBoxContainer" onClick={handleChatBoxClick}>
      {chatBoxActive
        ? (<div>
            Chatting with: {getUserName(recipientID)}
            <div>
              {/* TODO: Show message history here */}
              {messsageHistory.map((messageObj) => { return <MessageTile />; })}
            </div>
          </div>)
        : 'Open Chatbox'}
    </div>
  );
}

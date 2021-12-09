/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { getUserName } from './chatBoxHelperFunctions.js';
import MessageTile from './MessageTile.jsx';

export default function ChatBox({ senderID, recipientID }) {
  const [chatBoxActive, setChatBoxActive] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageText, setMessageText] = useState('');

  const handleChatBoxClick = () => { setChatBoxActive(!chatBoxActive); };
  const getMessageHistory = () => {
    axios.get('/api/messages', {})
      .then((results) => { console.log('GOT MESSAGES BACK:', results.data); })
      .then(() => { setMessageHistory([]); })
      .catch((err) => { console.log(err); });
  };
  const handleSendMessage = () => {
    axios.post('/api/messages', {
      // sender_user_id: senderID,
      // recipient_user_id: recipientID,
      senderID: '1',
      recipientID: '2',
      text: messageText,
      date: new Date()
    })
      // .then(() => { getMessageHistory(); })
      .then(() => { setMessageText(''); })
      // .then(() => { console.log('Message submitted'); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => { getMessageHistory(); }, []);
  const today = new Date();
  return (
    <div className="chatBoxContainer">
      <span className="chatBoxTitle" onClick={handleChatBoxClick}>
        Chat with: {getUserName(recipientID)}
        {/* {today.toString()} */}
      </span>
      {chatBoxActive
        ? (<div>
            <div>
              {messageHistory.map((message) => { return <MessageTile message={message} />; })}
              {messageHistory.toString()}
              <div className="messageInputBox">
                <input type="text" className="messageInput" onChange={(e) => { setMessageText(e.nativeEvent.target.value); }}></input>
                <button type="submit" onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </div>)
        : null}
    </div>
  );
}

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
  const [messsageHistory, setMessageHistory] = useState([]);
  const [messageText, setMessageText] = useState('');

  const handleChatBoxClick = () => { setChatBoxActive(!chatBoxActive); };
  const getMessageHistory = () => {
    axios.get('http://localhost:3000/messages', {})
      .then((results) => { console.log('GOT MESSAGES BACK:', results.data); })
      .then(() => { setMessageHistory([]); })
      .catch();
  };
  const handleSendMessage = () => {
    axios.post('http://localhost:3000/messages', {
      sender_user_id: senderID,
      recipient_user_id: recipientID,
      text: messageText,
      dateTime: new Date()
    })
      .then(() => { getMessageHistory(); })
      .then(() => { setMessageText(''); })
      // .then(() => { console.log('Message submitted'); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => { getMessageHistory(); }, []);

  return (
    <div className="chatBoxContainer">
      <span className="chatBoxTitle" onClick={handleChatBoxClick}>
        Chat with: {getUserName(recipientID)}
      </span>
      {chatBoxActive
        ? (<div>
            <div>
              {messsageHistory.map((message) => { return <MessageTile message={message} />; })}
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

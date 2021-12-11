/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable block-spacing */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from './Socket.jsx';
import './chat.css';

const Chat = ({ userID }) => {
  let today = new Date();
  let todayString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
  const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [senderID, setSenderID] = useState(userID);
  const [recipientID, setRecipientID] = useState(2);

  useEffect(() => {
    if (room) initiateSocket(room);
    subscribeToChat((err, data) => {
      if (err) return;
      setChat((oldChats) => [data, ...oldChats]);
    });
    return () => {
      disconnectSocket();
    };
  }, [room]);

  // HELPER FUNCTIONS
  const getMessageHistory = () => {
    axios.get('/api/messages/history', {
      senderID: senderID,
      recipientID: 1
    })
      .then((results) => {
        const messageHistory = results.data.map((messageObj) => { return messageObj.text; });
        setChat(messageHistory);
      })
      // .then((results) => { console.log(results.data); })
      .catch((err) => { console.log(err); });
  };
  useEffect(() => {
    setSenderID(userID);
    getMessageHistory();
  }, []);

  const addMessageToDB = () => {
    axios.post('/api/messages', {
      senderID: senderID,
      recipientID: 1,
      text: message,
      date: todayString
    })
      .then(() => { setMessage(''); })
      .then(() => { getMessageHistory(); })
      .catch((err) => { console.log(err); });
  };

  const getUsername = (id) => {
    axios.get('/api/messages', { id })
      .then()
      .catch((err) => { console.log(err); });
  };

  return (
    <div className="chatBoxContainer">
      UserID: {userID}
      <h1 className="chatRoom">Room: {room}</h1>
      <div>
        {rooms.map((r, i) => {
          return <button type="submit" onClick={() => { setRoom(r); }} key={i}>{r}</button>;
        })}
      </div>
      <h1 className="chatHeader">Live Chat:</h1>
      <div className="chatArea">
        {chat.map((m, i) => {
          // TODO: render message to left/right for sender/receiver
          return <p key={i} className="message">{m}</p>;
        })}
      </div>
      <div>
        <input
          type="text"
          name="name"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            addMessageToDB();
            setChat((oldChats) => [message, ...oldChats]);
            sendMessage(room, message);
            setMessage('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable block-spacing */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from './Socket.jsx';
import './chat.css';
import axios from 'axios';

const Chat = () => {
  let today = new Date();
  let todayString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
  const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [senderID, setSenderID] = useState(1);
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
  const addMessageToDB = () => {
    axios.post('/api/messages', {
      senderID: 1,
      recipientID: 1,
      text: message,
      date: todayString
    })
      // .then(() => { getMessageHistory(); })
      .then(() => { setMessage(''); })
      .then(() => { console.log('Message submitted'); })
      .catch((err) => { console.log(err); });
  };

  return (
    <div>
      <h1 className="chatRoom">Room: {room}</h1>
      {rooms.map((r, i) => {
        return <button type="submit" onClick={() => { setRoom(r); }} key={i}>{r}</button>;
      })}
      <h1 className="chatHeader">Live Chat:</h1>
      {chat.map((m, i) => {
        return <p key={i}>{m}</p>;
      }).reverse()}
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
  );
};

export default Chat;

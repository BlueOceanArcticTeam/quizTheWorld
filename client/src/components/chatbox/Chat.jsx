/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable block-spacing */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from './Socket.jsx';

const Chat = () => {
  const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

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

  return (
    <div>
      <h1>Room: {room}</h1>
      {rooms.map((r, i) => {
        return <button type="submit" onClick={() => { setRoom(r); }} key={i}>{r}</button>;
      })}
      <h1>Live Chat:</h1>
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
          setChat((oldChats) => [message, ...oldChats]);
          setMessage('');
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;

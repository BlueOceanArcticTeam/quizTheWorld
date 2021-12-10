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
      {rooms.map((r, i) =>
        <button onClick={() => setRoom(r)} key={i}>{r}</button>)}
      <h1>Live Chat:</h1>
      <input type="text" name="name" value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={()=> sendMessage(room,message)}>Send</button>
      { chat.map((m, i) => <p key={i}>{m}</p>) }
    </div>
  );
};

export default Chat;

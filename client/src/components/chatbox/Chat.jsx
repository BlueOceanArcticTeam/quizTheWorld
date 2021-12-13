/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable block-spacing */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from './Socket.jsx';
import Message from './Message.jsx';
import { AppContext } from '../../App.jsx';
import './chat.css';

const Chat = () => {
  const today = new Date();
  const todayString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;

  const { userID } = useContext(AppContext);
  const rooms = ['A', 'B', 'C'];
  const [room, setRoom] = useState(rooms[0]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [senderID, setSenderID] = useState(userID);
  const [recipientID, setRecipientID] = useState(2); // TODO: Make this dynamic
  const [recipientUsername, setRecipientUsername] = useState('');

  useEffect(() => {
    if (room) { initiateSocket(room); }
    subscribeToChat((err, data) => {
      if (err) return;
      setChat((oldChats) => [data, ...oldChats]);
    });
    return () => { disconnectSocket(); };
  }, [room]);

  // HELPER FUNCTIONS
  const addMessageToDB = () => {
    axios.post('/api/messages', {
      senderID: senderID,
      recipientID: 2,
      text: message,
      date: todayString
    })
      .then(() => { setMessage(''); })
      .then(() => { getMessageHistory(); })
      .catch((err) => { console.log(err); });
  };

  const handleMessageSubmit = () => {
    addMessageToDB();
    setChat([message, ...chat]);
    sendMessage(room, message);
    setMessage('');
  };

  const handleKeyDown = (e) => {console.log(e); if (e.key === 'Enter') { handleMessageSubmit(); }};

  const getMessageHistory = () => {
    axios.get('/api/messages', {
      params: {
        senderID: senderID,
        recipientID: 2
      }
    })
      .then((results) => {
        const messageObjHistory = results.data.map((messageObj) => { return messageObj; });
        // const messageHistory = results.data.map((messageObj) => { return messageObj.text; });
        setChat(messageObjHistory);
      })
      .catch((err) => { console.log(err); });
  };

  const getRecipientUsername = (id) => {
    axios.get(`/api/messages/${id}`)
      .then((results) => { setRecipientUsername(results.data); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    setSenderID(userID);
    getRecipientUsername(recipientID);
  }, []);

  useEffect(() => {
    getMessageHistory();
  }, [chat]);

  // useEffect(() => { console.log(chat); });

  return (
    <div className="chatBoxContainer">
      <h4 className="chatTitle">{recipientUsername}</h4>
      <div>
        {/* {rooms.map((r, i) => { return <button type="submit" onClick={() => { setRoom(r); }} key={i}>{r}</button>; })} */}
      </div>
      <div className="chatArea">
        {chat.map((m, i) => {
          // TODO: render message to left/right for sender/receiver
          const className = (m.sender_user_id === userID) ? 'sender' : 'recipient';
          return <Message messageObj={m} key={i} setSenderID={setSenderID} messageClassName={className} />;
        })}
      </div>
      <div role="button" tabIndex="0" onKeyDown={handleKeyDown}>
        <input
          type="text"
          name="name"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" onClick={handleMessageSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

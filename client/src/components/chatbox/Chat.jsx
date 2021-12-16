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
import SendIcon from '@mui/icons-material/Send';
import Message from './Message.jsx';
import { AppContext } from '../../App.jsx';
import './chat.css';

const Chat = () => {
  const today = new Date();
  const todayString = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;

  const { user, recipientID, setDisplayModal, setDisplayChat, setDisplayChatFriendList } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [senderID, setSenderID] = useState(user.id);
  const [recipientFirstName, setRecipientFirstName] = useState('');
  const [recipientLastName, setRecipientLastName] = useState('');

  // CHAT COMMENTS
  // Make delete button only show up after clicking a message
  // Make chatbox disappear after clicking outside of it
  // Don't let chatbox break App if user not logged in

  // HELPER FUNCTIONS
  const handleKeyDown = (e) => { if (e.key === 'Enter') { handleMessageSubmit(); }};

  const handleClickFriendsButton = () => { setDisplayChat(false); };

  const getMessageHistory = () => {
    axios.get('/api/messages', {
      params: { senderID: senderID, recipientID: recipientID }
    })
      .then((results) => {
        const messageObjHistory = results.data.map((messageObj) => { return messageObj; });
        setChat(messageObjHistory);
      })
      .catch((err) => { console.log(err); });
  };

  const addMessageToDB = () => {
    axios.post('/api/messages', {
      senderID: senderID,
      recipientID: recipientID,
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
    setMessage('');
  };

  const getRecipientName = (id) => {
    axios.get(`/api/messages/${id}`)
      .then((results) => {
        setRecipientFirstName(results.data.firstname);
        setRecipientLastName(results.data.lastname);
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    setSenderID(user.id);
    getRecipientName(recipientID);
  }, [recipientID]);

  useEffect(() => { getMessageHistory(); }, [chat, message]);

  return (
    <div className="chatBoxContainer">
      <div className="chatTitleContainer">
        <div className="chatTitle">
          <div>
            {recipientFirstName}
          </div>
          <div className="chatTitleSpace">
            {' '}
          </div>
          <div>
            {recipientLastName}
          </div>
        </div>
      </div>
      <div className="friendsButtonContainer">
        <button type="button" className="friendsButton" onClick={handleClickFriendsButton}>Friends</button>
      </div>
      <div className="chatArea">
        {chat.map((m, i) => {
          const className = (m.sender_user_id === user.id) ? 'sender' : 'recipient';
          return <Message messageObj={m} key={i} setSenderID={setSenderID} messageClassName={className} chat={chat} setChat={setChat}/>;
        })}
      </div>
      <div className="messageInputContainer" role="button" tabIndex="0" onKeyDown={handleKeyDown}>
        <input
          type="text"
          name="name"
          value={message}
          onChange={(e) => { setMessage(e.target.value); }}
        />
        <SendIcon className="sendMessageButton" onClick={handleMessageSubmit} />
      </div>
    </div>
  );
};

export default Chat;

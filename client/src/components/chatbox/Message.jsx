/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../App.jsx';
import './chat.css';

const Message = ({ messageObj, messageClassName, chat, setChat }) => {
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
  const { userID } = useContext(AppContext);

  const deleteMessage = () => {
    axios.delete('/api/messages', { params: { messageID: messageObj.id } })
      .then(() => { setChat([...chat]); })
      .catch((err) => { console.log(err); });
  };

  return (
    <div
      className={`messageText ${messageClassName}`}
      onClick={() => { setDisplayDeleteButton(!displayDeleteButton); }}
    >
      <div className="messageText">
        {messageObj.text}
      </div>
      {(userID === messageObj.sender_user_id)
        ? displayDeleteButton
          ? <button type="submit" className="deleteMessageButton" onClick={deleteMessage}>Delete</button>
          : null
        : null}
    </div>
  );
};

export default Message;

/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import axios from 'axios';
import React, { useState } from 'react';
import './chat.css';

const Message = ({ messageObj, messageClassName }) => {
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false);
  const deleteMessage = () => {
    axios.delete('/api/messages', { params: { messageID: messageObj.id } })
      .then()
      .catch((err) => { console.log(err); });
  };

  return (
    <div
      className="messageContainer"
      onMouseEnter={() => { setDisplayDeleteButton(true); }}
      onMouseLeave={() => { setDisplayDeleteButton(false); }}
    >
      <div className={`messageText ${messageClassName}`}>
        {messageObj.text}
      </div>
      <div className="deleteMessageButtonContainer">
        {displayDeleteButton
          ? <button type="submit" className="deleteMessageButton" onClick={deleteMessage}>Delete</button>
          : null}
      </div>
    </div>
  );
};

export default Message;

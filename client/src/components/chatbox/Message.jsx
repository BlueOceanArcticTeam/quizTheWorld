import React from 'react';

const Message = ({ messageObj }) => {
  return (
    <div>
      {messageObj.text}
    </div>
  );
};

export default Message;

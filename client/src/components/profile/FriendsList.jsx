/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import React, { useState } from 'react';
import Friend from './Friend.jsx';

const FriendList = (userID) => {
  const [friendList, setFriendList] = useState([1]);

  const getFriendList = () => {
    axios.get(`/${userID}/friends`)
      .then((results) => { console.log(results); })
      .then(() => { setFriendList([...friendList]); })
      .catch((err) => { console.log(err); });
  };

  return (
    <div>
      {friendList.forEach((friend) => {
        getFriendList();
        return <Friend />;
      })}
    </div>
  );
};

export default FriendList;

/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AppContext } from '../../App.jsx';
import Modal from './Modal.jsx';
import RenderFriend from '../profile/RenderFriend.jsx';

export default function SearchModal() {
  // get context from app
  const {
    search, setSearch, users, render, setRender, userID, isLoggedIn, searchLocation, setQuery,
  } = useContext(AppContext);

  const navigate = useNavigate();

  function addFriend(id) {
    if (isLoggedIn) {
      axios
        .post(`/api/profile/${userID}/friends/${id}`, null, {
          params: {
            user_id: userID,
            friend_id: id,
          },
        })
        .then((response) => response.status)
        .then(() => { closeModal(); setQuery(''); })
        .catch((err) => console.warn(err));
    }
  }

  function closeModal() {
    setRender(false);
    setQuery('');
  }

  function profileClick(id) {
    navigate(`/profile/${id}`);
    closeModal();
    setQuery('');
  }

  useEffect(() => {
    axios.get('/api/searchQuery', {
      params: {
        queryItem: 'Animals',
      },
    });
  }, [search]);

  return (

    <Modal
      value={render}
    >
      <div>
        <div
          id="search"
          style={{
            position: 'absolute', alignItems: 'center', left: searchLocation.x + 16, top: searchLocation.y - 1.55 + searchLocation.height, margin: 'auto', display: 'flex', width: searchLocation.width - 32, border: '1px solid black', borderTop: 'none', backgroundColor: '#E9CEFF', zIndex: '99999', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px',
          }}
        >

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '100%',
          }}
          >
            <ul style={{ padding: '10px', margin: '0px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{
                  color: '#FE6845', margin: '0', padding: '0',
                }}
                >
                  Users:
                </h2>
                <button type="button" style={{ width: 'fit-content', height: 'fit-content' }} onClick={closeModal}>X</button>
              </div>
              {search ? search.map((item, index) => (
                <div key={index}>
                  <li className="searchedusers" value={item.id}>
                    {RenderFriend(item, index, 'search')}
                    <div className="searcheduserbuttons" style={{ marginBottom: '10px' }}>
                      <button type="button" onClick={() => profileClick(item.id)}>See Profile</button>
                      <button type="button" onClick={() => { addFriend(item.id); }}>Add friend</button>
                    </div>
                  </li>
                </div>
              )) : null}
            </ul>

          </div>
        </div>
      </div>
    </Modal>
  );
}

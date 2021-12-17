/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal.jsx';
import { AppContext } from '../../App.jsx';

export default function LevelUp({ searchItem }) {
// get context from app
  const { searched, setSearched, users } = useContext(AppContext);
  useEffect(() => {
    axios.get('/api/searchQuery', {
      params: {
        queryItem: 'Animals',
      },
    })
      .then((resp) => {
        console.log(resp.data);
      });
  }, [searchItem]);

  return (
    <div>
      {console.log('this is the search')}
      <Modal>
        <div id="search">
          test
        </div>
      </Modal>
    </div>
  );
}

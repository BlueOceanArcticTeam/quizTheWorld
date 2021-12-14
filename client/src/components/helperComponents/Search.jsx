/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from '../Modal.jsx';
import { AppContext } from '../App.jsx';

export default function LevelUp() {
// get context from app
  const { searched, setSearched, users} = useContext(AppContext);

  return (
    <Modal value={}>
      <div id="search">
        test
      </div>
    </Modal>
  );
}

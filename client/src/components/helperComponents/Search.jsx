/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import { closeComplete } from 'pg-protocol/dist/messages';
import Modal from '../modal/Modal.jsx';
import { AppContext } from '../../App.jsx';
import SearchModal from '../modal/SearchModal.jsx';

export default function Search() {
  // get context from app
  const {
    render, setRender, users, search, setSearch, setSearchLocation, query, setQuery,
  } = useContext(AppContext);
  const [data, setData] = useState();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/profile/${search[0].id}`);
    setRender(false);
    setQuery('');
  }

  function handleChange(e) {
    setQuery(e.target.value);
    e.preventDefault();
    if (e.target.value.length === 0) {
      setRender(false);
    } else {
      axios.get('/api/searchQuery', {
        params: {
          queryItem: e.target.value,
        },
      })
        .then((resp) => {
          setSearch(resp.data, 'response here');
        });
      setRender(true);
      setSearchLocation(e.target.getBoundingClientRect());
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        onChange={handleChange}
        value={query}
        placeholder="Search for people.."
        style={{
          borderRadius: '20px', marginRight: '10px', margin: 'auto', backgroundColor: '#E9CEFF', paddingLeft: '10px',
        }}
      />
      {/* <SearchIcon style={{ color: 'white', margin: 'auto' }} className="search" /> */}
    </form>
  );
}

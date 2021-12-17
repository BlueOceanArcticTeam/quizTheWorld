import React, { useState, useContext, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Link,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Outlet } from 'react-router';
import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import axios from 'axios';
import Login from '../login/Login.jsx';
import Quizzes from '../quizzes/Quizzes.jsx';
import { AppContext } from '../../App.jsx';
import LevelUp from './Search.jsx';
import Modal from '../Modal/Modal.jsx';

const NavBar = function () {
  const [query, setQuery] = useState('');
  const [render, setRender] = useState(false);
  const [data, setData] = useState();
  const { user, handleLogOut, userID } = useContext(AppContext);
  const [userDropDown, setUserDropDown] = useState(false);
  // component functions - event handlers

  function handleChange(e) {
    setQuery(e.target.value);
    console.log(query, ' query');
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.get('/api/searchQuery', {
      params: {
        queryItem: query,
      },
    })
      .then((resp) => {
        setData(resp.data, 'response here');
      });
    setRender(true);
  }

  function handleClick(e) {
    axios
      .post(`/api/profile/${userID}/friends/${e.target.value}`, null, {
        params: {
          user_id: userID,
          friend_id: e.target.value,
        },
      })
      .then((response) => response.status)
      .catch((err) => console.warn(err));
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      height: '10vh',
      zIndex: '300',
      width: '90vw',

    }}
    >
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2em',

      }}
      >
        <Link
          style={{
            color: '#FE6845', fontSize: '2em', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/"
        >
          QuizKnows
        </Link>
        <Link
          style={{
            color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          style={{
            color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/quizzes"
        >
          Quizzes
        </Link>
        { user
          ? (
            <Link
              style={{
                color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
              }}
              to={`/profile/${userID}`}
            >
              {' '}
              My Account
            </Link>
          )
          : (
            <Link
              style={{
                color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
              }}
              to="/login"
            >
              My Account
            </Link>
          ) }
        {/* HERE IS THE SEARCH BAR */}
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={query} placeholder="Search for quizzes or people.." style={{ borderRadius: '20px', marginRight: '10px' }} />
          <SearchIcon style={{ color: 'white' }} className="search" />
        </form>
        {/* {user ? console.log(user.username) : console.log('not logged in')} */}
        {
        user
          ? (
        // logout button
            userDropDown
              ? (
                <div
                  style={{
                    display: 'flex', float: 'right', width: '10em', flexDirection: 'column', marginLeft: 'auto',
                  }}
                  sx={{
                    marginLeft: 'auto',
                    background: '#FE6845',
                    color: '#FFF1EA',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    variant="contained"
                    style={{ width: '10em', height: '2em' }}
                    sx={{
                      marginLeft: 'auto',
                      background: '#FE6845',
                      color: '#FFF1EA',
                      textDecoration: 'none',
                    }}
                  />
                  <Button
                    to="/"
                    variant="contained"
                    style={{ width: '10em' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setUserDropDown(!userDropDown);
                      // handleLogOut(e);
                    }}
                    sx={{
                      marginLeft: 'auto',
                      background: '#FE6845',
                      color: '#FFF1EA',
                      textDecoration: 'none',
                    }}
                  >
                    {user.username }
                  </Button>
                  <Button
                    to="/"
                    variant="contained"
                    style={{ width: '10em' }}
                    onClick={(e) => {
                      e.preventDefault();
                      // setUserDropDown(!userDropDown);
                      setUserDropDown(false);
                      handleLogOut(e);
                    }}
                    sx={{
                      marginLeft: 'auto',
                      background: '#FE6845',
                      color: '#FFF1EA',
                      textDecoration: 'none',
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )
              : (
                <Button
                  to="/"
                  variant="contained"
                  style={{ width: '10em' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setUserDropDown(!userDropDown);
                    // handleLogOut(e);
                  }}
                  sx={{
                    marginLeft: 'auto',
                    background: '#FE6845',
                    color: '#FFF1EA',
                    textDecoration: 'none',
                  }}
                >
                  {user.username }
                </Button>
              )
          )
          : (
            <Button
              to="/login"
              component={Link}
              variant="contained"
              style={{ width: '10em' }}
              sx={{
                marginLeft: 'auto',
                background: '#FE6845',
                color: '#FFF1EA',
                textDecoration: 'none',
              }}
            >
              Login
            </Button>
          )
}
      </Box>
      <Modal
        value={render}

      >
        <div
          id="search"
          style={{
            position: 'absolute', alignItems: 'center', left: 0, right: 0, top: '25%', margin: 'auto', display: 'flex', width: '30vw', height: '30vh', border: '1px solid red', backgroundColor: '#E9CEFF', zIndex: '99999',
          }}
        >

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '100%',
          }}
          >
            <ul>
              {data ? data.map((item) => (
                <li value={item.id} onClick={handleClick}>{item.username}</li>

              )) : null}
            </ul>

          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NavBar;

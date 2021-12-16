/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

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
import Login from '../login/Login.jsx';
import Quizzes from '../quizzes/Quizzes.jsx';
import { AppContext } from '../../App.jsx';

export default function NavBar() {
  // set state variables below:
  const { user, handleLogOut, userID } = useContext(AppContext);
  const [userDropDown, setUserDropDown] = useState(false);
  // component functions - event handlers

  // use Effect:

  // render component:
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
        {/* <Link
          style={{
            color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/chat"
        >
          Chat
        </Link> */}
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
        <input type="text" placeholder="Search for quizzes or people.." style={{ borderRadius: '20px', marginRight: '10px' }} />
        <SearchIcon style={{ color: 'white' }} className={'search'} />
        {/* {user ? console.log(user.username) : console.log('not logged in')} */}
        {
        user
          ? (
        // logout button
            userDropDown
              ? (
                <div
                  style={{
                    display: 'flex', float: 'right', width: '8em', flexDirection: 'column', top: '8em', marginLeft: 'auto',
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
                    style={{ width: '8em', height: '2em' }}
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
                    style={{ width: '8em' }}
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
                    style={{ width: '8em' }}
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
                  style={{ width: '8em' }}
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
    </div>
  );
}

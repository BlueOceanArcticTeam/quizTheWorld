/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
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
import ChatBox from '../chatbox/ChatBox.jsx';
import Quizzes from '../quizzes/Quizzes.jsx';
import { AppContext } from '../../App.jsx';

export default function NavBar() {
  // set state variables below:
  const { userData, handleLogOut } = useContext(AppContext);
  // component functions - event handlers

  // use Effect:

  // render component:
  return (
    <div style={{
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontStyle: '',
      position: 'absolute',
      zIndex: '100',
    }}
    >
      <Box sx={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2em',
        paddingTop: '1em',
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
        <Link
          style={{
            color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/chat"
        >
          Chat
        </Link>
        <Link
          style={{
            color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/profile/:user_id"
        >
          My Account
        </Link>
        {/* {console.log('userData', userData)} */}
        {
        userData
          ? (
        // logout button
            <Button
              href="/api/auth/logout"
              variant="contained"
              sx={{
                marginLeft: 'auto',
                background: '#FE6845',
                color: '#FFF1EA',
                textDecoration: 'none',
                marginRight: '5em',
              }}
            >
              Logout
            </Button>
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
                marginRight: '5em',
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

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
import axios from 'axios';
import Login from '../login/Login.jsx';
import Quizzes from '../quizzes/Quizzes.jsx';
import { AppContext } from '../../App.jsx';
import LevelUp from './Search.jsx';
import Modal from '../modal/Modal.jsx';
import Search from './Search.jsx';
import './NavBar.css';

const NavBar = function () {
  const { user, handleLogOut, userID } = useContext(AppContext);
  const [userDropDown, setUserDropDown] = useState(false);
  // component functions - event handlers

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
          className="quizKnows"
          style={{
            color: '#FE6845',
            fontSize: '2em',
            fontWeight: 'bold',
            paddingRight: '2em',
            textDecoration: 'none',
            transition: 'box-shadow .3s',
          }}
          to="/"
        >
          QuizKnows
        </Link>
        <Link
          className="link"
          style={{
            color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          className="link"
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
              className="link"
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
              className="link"
              style={{
                color: '#FFF1EA', fontWeight: 'bold', paddingRight: '2em', textDecoration: 'none',
              }}
              to="/login"
            >
              My Account
            </Link>
          ) }
        {/* HERE IS THE SEARCH BAR */}
        <Search />
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
    </div>
  );
};

export default NavBar;

/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import './register.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import inputValidation from '../../utilities/inputValidation.js';
import LoginImage from './assets/Login.png';
import { AppContext } from '../../App.jsx';

export default function Register() {
  const { goToHome } = useContext(AppContext);
  // set state variables below:
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [thumbnail_url, setThumbnail_url] = useState('');
  const [registerPassword1, setRegisterPassword1] = useState('');
  const [registerPassword2, setRegisterPassword2] = useState('');
  const [message, setMessage] = useState('');
  // const [~, set~] = useState('');
  // component functions - event handlers
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('handleRegister');
    // verify no other user has the same username or email
    // veryify the passwords are the same
    if (registerPassword1 !== registerPassword2) {
      setMessage('passwords must be equal');
      // alert('passwords must be equal');
      document.getElementById('password1').focus();
    }

    const emailCheck = inputValidation(email, 'email');
    if (emailCheck.valid === false) {
      setMessage(emailCheck.errorMessage);
      return;
    }
    const usernameCheck = inputValidation(username, 'username');
    if (usernameCheck.valid === false) {
      setMessage(usernameCheck.errorMessage);
      return;
    }
    const firstNameCheck = inputValidation(firstName, 'firstname');
    if (firstNameCheck.valid === false) {
      setMessage(firstNameCheck.errorMessage);
      return;
    }
    const lastNameCheck = inputValidation(lastName, 'lastname');
    if (lastNameCheck.valid === false) {
      setMessage(lastNameCheck.errorMessage);
      return;
    }
    if (thumbnail_url.length > 0) {
      console.log('1');
      const thumbnailCheck = inputValidation(thumbnail_url, 'message');
      if (thumbnailCheck.valid === false) {
        setMessage(emailCheck.errorMessage);
        return;
      }
    }
    // Check the password,
    // something isn't working in the password function, so we are temp using the username func
    const passwordCheck = inputValidation(registerPassword1, 'username');
    console.log('2');
    if (passwordCheck.valid === false) {
      setMessage('Please check that the passwords match and are longer than 8 charaters');
      return;
    }

    axios({
      method: 'post',
      data: {
        // registration data
        username,
        password: registerPassword1,
        firstName,
        lastName,
        email,
        thumbnail_url,
      },
      withCredentials: true,
      url: '/api/auth/register',
    })
      .then((res) => {
        if (res.data === 'user created') {
          alert('Thank you for registering');
          handleLogin();
          // goToHome();
          // window.location.reload(true);
        } else {
          setMessage('Sorry, someone has already registered with that email or username');
        }
      });
  };

  // component functions - event handlers
  const handleLogin = () => {
    axios({
      method: 'post',
      data: {
        // login data
        email,
        password: registerPassword1,
      },
      withCredentials: true,
      url: '/api/auth/loginlocal',
    })
      .then((res) => {
        if (res.data === 'success') {
          // set user data in state and redirect
          goToHome();
          window.location.reload(true); // HACK:
        } else {
          setMessage('Sorry, that user does not exist');
          // alert('Sorry, that user does not exist');
        }
      });
  };
  // use Effect:

  // render component:
  return (
    <div
      className="login"
      style={{
        width: '100vw', height: '100vh',
      }}
    >
      <div style={{
        width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'top',
      }}
      >
        <img
          src={LoginImage}
          alt=""
          style={{
            zIndex: '-100',
            width: '100vw',
            height: '100vh',
            position: 'absolute',
          }}
        />
        {/* <h1>QuizKnows</h1> */}
        <div style={{
          zIndex: '100',
          position: 'absolute',
          display: 'flex',
          width: '18em',
          height: '14em',
          top: '15%',
          left: '40%',
          flexDirection: 'column',
          gap: '.35em',
          color: '#930DFF',
        }}
        >
          <div>
            {message}
          </div>
          <form>
            {/* This is the Input for the Email */}
            <label htmlFor="email" style={{ fontSize: '1.5em' }}>Email:</label>
            <input
              type="text"
              id="email"
              required
              onChange={(e) => { setEmail(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
              }}
            />
            {/* This is the Input for the Username */}
            <label htmlFor="username" style={{ fontSize: '1.5em' }}>Username:</label>
            <input
              type="text"
              id="username"
              required
              onChange={(e) => { setUsername(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
              }}
            />
            {/* This is the Input for the First Name */}
            <label htmlFor="first" style={{ fontSize: '1.5em' }}>First Name:</label>
            <input
              type="text"
              id="first"
              required
              onChange={(e) => { setFirstName(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
              }}
            />
            {/* This is the Input for the Last Name */}
            <label htmlFor="last" style={{ fontSize: '1.5em' }}>Last Name:</label>
            <input
              type="text"
              id="last"
              required
              onChange={(e) => { setLastName(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
              }}
            />
            {/* This is the Input for the Thumbnail */}
            <label htmlFor="last" style={{ fontSize: '1.5em' }}>Thumbnail url for profile picture (optional):</label>
            <input
              type="text"
              id="last"
              onChange={(e) => { setThumbnail_url(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
              }}
            />
            {/* This is the input for the PassWord1 */}
            <label htmlFor="password1" style={{ fontSize: '1.5em' }}>Password:</label>
            <input
              type="password"
              id="password1"
              required
              onChange={(e) => { setRegisterPassword1(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', fontSize: '1.25em', border: '.5px solid orange',
              }}
            />
            {/* This is the input for the PassWord2 */}
            <label htmlFor="password2" style={{ fontSize: '1.5em' }}>Re-enter Password:</label>
            <input
              type="password"
              id="password2"
              required
              onChange={(e) => { setRegisterPassword2(e.target.value); }}
              style={{
                height: '2em', borderRadius: '3px', fontSize: '1.25em', border: '.5px solid orange',
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            >
              <Button
                variant="contained"
                sx={{
                  width: '50%',
                  marginTop: '10px',
                  float: 'right',
                  background: '#930DFF',
                  ':hover': {
                    bgcolor: '#ff9100', // theme.palette.primary.main
                    color: 'white',
                  },
                }}
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handleRegister(event);
                }}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

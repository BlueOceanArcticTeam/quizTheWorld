/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import './register.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import LoginImage from './assets/Login.png';
import { AppContext } from '../../App.jsx';

export default function Register() {
  const { goToHome } = useContext(AppContext);
  // set state variables below:
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerPassword1, setRegisterPassword1] = useState('');
  const [registerPassword2, setRegisterPassword2] = useState('');
  const [message, setMessage] = useState('');
  // const [~, set~] = useState('');
  // component functions - event handlers
  const handleRegister = (e) => {
    e.preventDefault();
    // verify no other user has the same username or email
    // veryify the passwords are the same
    if (registerPassword1 !== registerPassword2) {
      setMessage('passwords must be equal');
      // alert('passwords must be equal');
      document.getElementById('password1').focus();
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
      },
      withCredentials: true,
      url: '/api/auth/register',
    })
      .then((res) => {
        if (res.data === 'user created') {
          alert('Thank you for registering');
          goToHome();
          window.location.reload(true);
        } else {
          setMessage('Sorry, someone has already registered with that email or username');
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
          top: '30%',
          left: '40%',
          flexDirection: 'column',
          gap: '.35em',
          color: '#930DFF',
        }}
        >
          <div>
            {message}
          </div>
          {/* This is the Input for the Email */}
          <label htmlFor="email" style={{ fontSize: '1.5em' }}>Email:</label>
          <input
            type="text"
            id="email"
            onChange={(e) => { setEmail(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
            }}
          />
          {/* This is the Input for the Username */}
          <label htmlFor="username" style={{ fontSize: '1.5em' }}>Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => { setUsername(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
            }}
          />
          {/* This is the Input for the First Name */}
          <label htmlFor="first" style={{ fontSize: '1.5em' }}>First Name:</label>
          <input
            type="text"
            id="first"
            onChange={(e) => { setFirstName(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
            }}
          />
          {/* This is the Input for the Last Name */}
          <label htmlFor="last" style={{ fontSize: '1.5em' }}>Last Name:</label>
          <input
            type="text"
            id="last"
            onChange={(e) => { setLastName(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', border: '.5px solid orange', fontSize: '1.25em',
            }}
          />
          {/* This is the input for the PassWord1 */}
          <label htmlFor="password1" style={{ fontSize: '1.5em' }}>Password:</label>
          <input
            type="password"
            id="password1"
            onChange={(e) => { setRegisterPassword1(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', fontSize: '1.25em', border: '.5px solid orange',
            }}
          />
          {/* This is the input for the PassWord2 */}
          <label htmlFor="password2" style={{ fontSize: '1.5em' }}>Re-enter Password:</label>
          <input
            type="password"
            id="password2"
            onChange={(e) => { setRegisterPassword2(e.target.value); }}
            style={{
              height: '3em', borderRadius: '3px', fontSize: '1.25em', border: '.5px solid orange',
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
              onClick={(event) => {
                event.preventDefault();
                handleRegister(event);
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

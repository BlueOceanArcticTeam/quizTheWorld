/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Routes, Switch, Route, Link, BrowserRouter,
} from 'react-router-dom';
import AppContext from './context.js';

import CreateQuiz from './components/createquiz/CreateQuiz.jsx';
import Header from './components/header/Header.jsx';
import HomePage from './components/home/HomePage.jsx';
import Login from './components/login/Login.jsx';
import NoPath from './components/nopath/NoPath.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';
import Quiz from './components/quiz/Quiz.jsx';
import Quizzes from './components/quizzes/Quizzes.jsx';
import Register from './components/register/Register.jsx';
import NavBar from './components/helperComponents/NavBar.jsx';
import Chat from './components/chatbox/Chat.jsx';

// We're using fetch!
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//* fetch('http://example.com/movies.json',)
//  .then(response => response.json())
//  .then(data => console.log(data));

const App = function () {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/profile/:user_id" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/create" element={<CreateQuiz />} />
          <Route path="/quizzes/:quiz_id" element={<Quiz />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NoPath />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

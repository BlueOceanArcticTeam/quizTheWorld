/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from './context.js';
import {
  Routes, Switch, Route, Link, BrowserRouter,
} from 'react-router-dom';
import HomePage from './components/home/HomePage.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';
import Header from './components/header/Header.jsx';


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
          <Route path="profile/" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

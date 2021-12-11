/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import NavBar from '../helperComponents/NavBar.jsx';

export default function Header() {
  // set state variables below:

  // component functions - event handlers

  // use Effect:

  // render component:
  return (
    <div style={{ position: 'absolute' }}>
      <NavBar />
      <Outlet />
    </div>
  );
}

/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../helperComponents/NavBar.jsx';

export default function Header() {
  return (
    <div style={{
      position: 'absolute', backgroundColor: 'transparent', background: 'none', zIndex: '100', width: '90vw',
    }}
    >
      <NavBar />
      <Outlet />
    </div>
  );
}

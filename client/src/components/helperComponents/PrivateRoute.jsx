/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../App.jsx';

export default function PrivateRoute() {
  const { user } = useContext(AppContext);
  const production = false; // turn this to true when deployed.  This will turn on private routes
  return (user)
    ? <Outlet />
    : <Navigate to={{ pathname: '/login' }} />; // , state: { from: location } this will get it to redirect back
}

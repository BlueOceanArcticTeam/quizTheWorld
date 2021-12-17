import React from 'react';
import {
  Routes, BrowserRouter as Router, Route, Link, useHistory, useLocation, Redirect, useParams,
  // useNavigate
} from 'react-router-dom';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { App } from '../client/src/App';
// const App = require('../client/src/App').default;

const AllTheProviders = function ({ children }) {
  return (
    <Router>
      <App>
        {children}
      </App>
    </Router>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

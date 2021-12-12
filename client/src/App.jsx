/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import axios from 'axios';
import {
  Routes, Switch, Route, Link, BrowserRouter, useHistory, useLocation, Redirect
} from 'react-router-dom';

import CreateQuiz from './components/createquiz/CreateQuiz.jsx';
import Header from './components/header/Header.jsx';
import HomePage from './components/home/HomePage.jsx';
import Login from './components/login/Login.jsx';
import NoPath from './components/nopath/NoPath.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';
import Quizzes from './components/quizzes/Quizzes.jsx';
import QuizPage from './components/quizzes/QuizPage.jsx';
import Register from './components/register/Register.jsx';
import NavBar from './components/helperComponents/NavBar.jsx';
import ChatPage from './components/chatbox/ChatPage.jsx';
import '../dist/styles.css';

// We're using fetch!
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//* fetch('http://example.com/movies.json',)
//  .then(response => response.json())
//  .then(data => console.log(data));

export const AppContext = React.createContext();

export const App = function () {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userID, setUserID] = useState(1); // TODO: Make this dynamic
  const [searched, setSearched] = useState('');
  const [user, setUser] = useState({});
  const [users, setUsers] = useState({});
  const [friends, setFriends] = useState({});

  function fetchUser() {
    axios
      .get(`/api/profile/${userID}`)
      .then((data) => {
        setUser(data.data[0]);
      })
      .catch((err) => {
        throw err;
      });
    axios
      .get(`/api/profile/${userID}/friends`)
      .then((data) => {
        setFriends(data.data.rows);
      });
  }
  function fetchAllUsers() {
    axios
      .get('/api/profile/users')
      .then((data) => {
        setUsers(data.data.rows);
      })
      .catch((err) => {
        throw err;
      });
  }

  // will need a function to fetch all quizzes for search bar

  // TODO: useEffect, check if user is logged in. If true, setUser to logged in user
  useEffect(() => {
    fetchAllUsers();
    // if the user is logged in, get their info and friends
    if (isLoggedIn) {
      fetchUser();
    }
  }, []);
  // OR: Just have a bool checking if user is logged in and then conditionally render pages
  return (

    <div className="app">
      <AppContext.Provider value={{
        userID,
        isLoggedIn,
        setUserID,
        setIsLoggedIn,
        user,
        friends,
        users
      }}
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path="/profile/:user_id" element={<ProfilePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/quiz" element={<QuizPage />} />
            <Route path="/quizzes/create" element={<CreateQuiz />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NoPath />} />
          </Route>
        </Routes>
        <button type="button" className="chatButton">Chat</button>
      </AppContext.Provider>
    </div>
  );
};

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => fakeAuth.signin(() => {
    setUser('user');
    cb();
  });

  const signout = (cb) => fakeAuth.signout(() => {
    setUser(null);
    cb();
  });

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  const history = useHistory();
  const auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!
      {' '}
      <button
        onClick={() => {
          auth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => (auth.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      ))}
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: '/' } };
  const login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };
}

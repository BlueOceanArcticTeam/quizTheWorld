/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import axios from 'axios';
import {
  Routes, Switch, Route, Link, BrowserRouter, useHistory, useLocation, Redirect, useParams,
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
import Chat from './components/chatbox/Chat.jsx';
import ChatFriendList from './components/chatbox/ChatFriendList.jsx';
import '../dist/styles.css';
import ChatFriend from './components/chatbox/ChatFriend.jsx';

export const AppContext = React.createContext();

export const App = function () {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayChat, setDisplayChat] = useState(true);
  const [displayChatFriendList, setDisplayChatFriendList] = useState(false);
  const [userID, setUserID] = useState(2); // TODO: Make this dynamic
  const [userData, setUserData] = useState();
  const [searched, setSearched] = useState('');
  const [user, setUser] = useState();
  const [users, setUsers] = useState({});
  const [friends, setFriends] = useState([]);

  function fetchFriends(userId) {
    // axios
    //   .get(`/api/profile/${userID}`)
    //   .then((data) => {
    //     setUser(data.data[0]);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
    console.log('App.jsx userId on 51', userId);
    axios
      .get(`/api/profile/${userId}/friends`)
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

  const getUserInformation = () => {
    axios
      .get('/api/auth/userInformation')
      .then((res) => {
        console.log('getUserInformation', res);
        if (res.data) {
          setIsLoggedIn(true);
          setUser(res.data);
          setUserID(res.data.id);
          fetchFriends(res.data.id);
        }
        // console.log('response', res.data);
      });
  };

  const handleLogOut = () => {
    axios.get('/api/auth/logout')
      .then((res) => {
        console.log('response from logging out', res);
        setIsLoggedIn(false);
        setUser();
        setUserID();
        console.log('logged out', user);
      });
  };

  // TODO: useEffect, check if user is logged in. If true, setUser to logged in user
  useEffect(() => {
    getUserInformation();
    fetchAllUsers();
    // if the user is logged in, get their info and friends
    // if (isLoggedIn) {
    //   fetchFriends();
    // }
  }, []);
  // OR: Just have a bool checking if user is logged in and then conditionally render pages
  return (

    <div className="app">
      <AppContext.Provider value={{
        userID,
        isLoggedIn,
        setDisplayModal,
        setDisplayChat,
        setDisplayChatFriendList,
        setUserID,
        setIsLoggedIn,
        user,
        friends,
        users,
        handleLogOut
      }}
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path={`/profile/${userID}`} element={<ProfilePage />} />
            <Route path="/:user_id" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/quiz" element={<QuizPage />} />
            <Route path="/quizzes/create" element={<CreateQuiz />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoPath />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        {displayModal
          ? (displayChat ? <Chat /> : <ChatFriendList />)
          : null}
        <button type="button" className="chatButton" onClick={() => { setDisplayModal(!displayModal); }}>
          <img alt="chatIcon" src="./chatCircularIcon.png" className="chatIcon" />
        </button>
        <div className="chatButtonSource">Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
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

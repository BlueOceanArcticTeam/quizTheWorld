/* eslint-disable import/no-cycle */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import axios from 'axios';
import {
  Routes, Switch, Route, Link, useHistory, useLocation, Redirect, useParams, useNavigate
} from 'react-router-dom';

// import e from 'cors';
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
import PrivateRoute from './components/helperComponents/PrivateRoute.jsx';
import '../dist/styles.css';
import './components/chatbox/chat.css';

export const AppContext = React.createContext();

export const App = function () {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayChat, setDisplayChat] = useState(true);
  const [displayChatFriendList, setDisplayChatFriendList] = useState(false);
  const [userID, setUserID] = useState(2); // TODO: Make this dynamic
  const [recipientID, setRecipientID] = useState(1);
  const [userData, setUserData] = useState();
  const [searched, setSearched] = useState('');
  const [user, setUser] = useState();
  const [users, setUsers] = useState({});
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  function fetchFriends(userId) {
    // axios
    //   .get(`/api/profile/${userID}`)
    //   .then((data) => {
    //     setUser(data.data[0]);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
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

  // this function will fetch the user information if they are logged in
  const getUserInformation = () => {
    axios
      .get('/api/auth/userInformation')
      .then((res) => {
        // console.log('getUserInformation', res);
        if (res.data) {
          setIsLoggedIn(true);
          setUser(res.data);
          setUserID(res.data.id);
          fetchFriends(res.data.id);
        }
      });
  };

  const handleLogOut = () => {
    axios.get('/api/auth/logout')
      .then((res) => {
        setIsLoggedIn(false);
        setUser();
        setUserID();
        goToHome();
      });
  };

  // TODO: useEffect, check if user is logged in. If true, setUser to logged in user
  useEffect(() => {
    getUserInformation();
    fetchAllUsers();
    // if the user is logged in, get their info and friends
    if (isLoggedIn) {
      fetchFriends(userID);
    }
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
        recipientID,
        setRecipientID,
        setIsLoggedIn,
        isLoggedIn,
        setUserID,
        setIsLoggedIn,
        user,
        friends,
        users,
        handleLogOut,
        goToHome,
      }}
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="*" element={<NoPath />} />
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<PrivateRoute />}>
              {' '}
              // KEEP
              <Route path="/profile" element={<ProfilePage />} />
              <Route path={`/profile/:${userID}`} element={<ProfilePage />} />
            </Route>
            {' '}
            //KEEP
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/quiz" element={<QuizPage />} />
            <Route path="/quizzes" element={<PrivateRoute />}>
              {' '}
              //KEEP
              <Route path="/quizzes/create" element={<CreateQuiz />} />
            </Route>
            {' '}
            //KEEP
            <Route path="/chat" element={<PrivateRoute />}>
              {' '}
              //KEEP
            </Route>
            {' '}
            //KEEP
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        {displayModal
          ? (displayChat ? <Chat /> : <ChatFriendList />)
          : null}
        <button type="button" className="chatButton" onClick={() => { setDisplayModal(!displayModal); }}>
          <img alt="chatIcon" src="./chatCircularIcon.png" className="chatIcon" />
        </button>
        <div className="chatButtonSource">
          Icons made by
          {' '}
          <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a>
          from
          {' '}
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </AppContext.Provider>
    </div>
  );
};

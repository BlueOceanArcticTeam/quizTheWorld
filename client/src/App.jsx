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
import ChatIcon from '@mui/icons-material/Chat';
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
import SearchModal from './components/modal/SearchModal.jsx';

export const AppContext = React.createContext();

export const App = function () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayChat, setDisplayChat] = useState(true);
  const [displayChatFriendList, setDisplayChatFriendList] = useState(false);
  const [userID, setUserID] = useState(2); // TODO: Make this dynamic
  const [recipientID, setRecipientID] = useState(1);
  const [userData, setUserData] = useState();
  const [user, setUser] = useState();
  const [users, setUsers] = useState({});
  const [friends, setFriends] = useState([]);
  const [render, setRender] = useState(false);
  const [search, setSearch] = useState();
  const [searchLocation, setSearchLocation] = useState({});
  const [query, setQuery] = useState('');

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

  useEffect(() => {
    getUserInformation();
    fetchAllUsers();
    if (isLoggedIn) {
      fetchFriends(userID);
    }
  }, []);

  // load search modal
  useEffect(() => {

  }, [render]);

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
        search,
        setSearch,
        setRender,
        render,
        searchLocation,
        setSearchLocation,
        query,
        setQuery
      }}
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="*" element={<NoPath />} />
            <Route index element={<HomePage />} />
            <Route path="/profile/:user_id" element={<ProfilePage />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/quiz/:quiz_id" element={<QuizPage />} />
            {/* <Route path="/quizzes" element={<PrivateRoute />}> */}
            <Route path="/quizzes/create" element={<CreateQuiz />} />
            {/* </Route> */}
            {/* <Route path="/chat" element={<PrivateRoute />}>
            </Route> */}
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {displayModal
          ? (displayChat ? <Chat /> : <ChatFriendList />)
          : null}

        {isLoggedIn
          ? (
            <button type="button" className="chatButton" onClick={() => { setDisplayModal(!displayModal); }}>
              <ChatIcon className="chatIcon" />
            </button>
          )
          : null}
        <SearchModal />
      </AppContext.Provider>
    </div>
  );
};

/* eslint-disable import/no-cycle */
/* eslint-disable comma-dangle */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
import React, {
  useState, useEffect, useContext, createContext
} from 'react';
import axios from 'axios';
import {
  Routes, Switch, Route, Link, useHistory, useLocation, Redirect, useParams, useNavigate,
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
import ChatPage from './components/chatbox/ChatPage.jsx';
import PrivateRoute from './components/helperComponents/PrivateRoute.jsx';
import '../dist/styles.css';

export const AppContext = React.createContext();

export const App = function () {
  const [userID, setUserID] = useState(2); // TODO: Make this dynamic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searched, setSearched] = useState('');
  const [user, setUser] = useState();
  const [users, setUsers] = useState({});
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();
  const goToHome = () => { navigate('/'); };
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
        setUserID,
        setIsLoggedIn,
        userID,
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
            {/* <Route path="/profile" element={<PrivateRoute />}> // KEEP */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path={`/profile/${userID}`} element={<ProfilePage />} />
            {/* </Route>  //KEEP */}
            {/* <Route path="/:user_id" element={<HomePage />} /> // not sure we need */}
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/quiz" element={<QuizPage />} />
            {/* <Route path="/quizzes" element={<PrivateRoute />}> //KEEP */}
            <Route path="/quizzes/create" element={<CreateQuiz />} />
            {/* </Route> //KEEP */}
            {/* <Route path="/chat" element={<PrivateRoute />}> //KEEP */}
            <Route path="/chat" element={<ChatPage />} />
            {/* </Route> //KEEP */}
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <button type="button" className="chatButton">Chat</button> */}
      </AppContext.Provider>
    </div>
  );
};

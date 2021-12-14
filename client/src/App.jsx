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

// We're using fetch!
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//* fetch('http://example.com/movies.json',)
//  .then(response => response.json())
//  .then(data => console.log(data));

export const AppContext = React.createContext();

export const App = function () {
  const [userID, setUserID] = useState(2); // TODO: Make this dynamic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
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
        // console.log('response', res.data);
      });
  };

  const handleLogOut = () => {
    axios.get('/api/auth/logout')
      .then((res) => {
        // console.log('response from logging out', res);
        setIsLoggedIn(false);
        setUser();
        setUserID();
        // console.log('logged out', user);
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
        goToHome
      }}
      >
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="*" element={<NoPath />} />
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path={`/profile/${userID}`} element={<ProfilePage />} />
            {/* <Route path="/:user_id" element={<HomePage />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/quiz" element={<QuizPage />} />
            <Route path="/quizzes/create" element={<CreateQuiz />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<PrivateRoute />}>
              <Route path="/chat" element={<ChatPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <button type="button" className="chatButton">Chat</button> */}
      </AppContext.Provider>
    </div>
  );
};

// const authContext = createContext();

// function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return (
//     <authContext.Provider value={ auth }>
//       {children}
//     </authContext.Provider>
//   )
// }

// function useAuth() {
//   return useContext(authContext);
// }

// function useProvideAuth() {
//   const [user, setUser] = useState(null);
// }

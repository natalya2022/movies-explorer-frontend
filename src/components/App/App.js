import './App.css';
import './../../index.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Navigation from '../Navigation/Navigation';
import * as api from '../../utils/MainApi.js';
import regtrue from '../../images/regtrue.svg';
import iconinfo from '../../images/info_data_icon.svg';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginSending, setIsLoginSending] = useState(false);
  const [isRegisterSending, setIsRegisterSending] = useState(false);
  const [isUserSending, setIsUserSending] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [toooltipMessage, setToooltipMessage] = useState({ link: '', text: '' });
  const [isUserError, setIsUserError] = useState({ error: '' });

  const navigate = useNavigate();

  const toolMessage = { ok: 0, err: 1 };
  const toolMessages = [
    { link: regtrue, text: 'Данные профиля изменены!' },
    { link: iconinfo, text: 'Что-то пошло не так! Попробуйте еще раз.' }
  ];

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(console.error);
    } else {
      setCurrentUser({});
    }
  }, [isLoggedIn]);

  // функция открытия мобильного меню
  function toggleMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // функция открытия попапа уведомения
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  //функия закрытия попапа уведомления
  const closePopup = () => {
    setIsInfoTooltipOpen(false);
  };

  // функция сброса ошибок
  function resetErrors() {
    setIsUserError({ error: '' });
  }

  // функция регистрации нового пользователя
  function handleNewUserReg(name, email, password) {
    setIsRegisterSending(true);
    api
      .register(name, email, password)
      .then(res => {
        setCurrentUser(res);
        handleInfoTooltipOpen();
        setToooltipMessage(toolMessages[toolMessage.ok]);
        handleUserLogin(res.email, password);
      })
      .catch(err => {
        console.error(err);
        setToooltipMessage(toolMessages[toolMessage.err]);
        handleInfoTooltipOpen();
      })
      .finally(() => setIsRegisterSending(false));
  }

  // функция авторизации пользователя
  function handleUserLogin(email, password) {
    setIsLoginSending(true);
    api
      .authorize(email, password)
      .then(res => {
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.error(err.status);
        setIsUserError({ error: err.message });
      })
      .finally(() => setIsLoginSending(false));
  }

  // хук проверки токена
  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line
  }, []);

  // функция проверки токена
  function handleCheckToken() {
    if (isLoggedIn) {
      navigate('/movies');
      return;
    }
    api
      .checkToken()
      .then(res => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch(err => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }

  // функция выхода из системы
  function userLogOut() {
    api.logOut();
    setIsLoggedIn(false);
    setCurrentUser({});
    // setCards([]);
    setIsMobileMenuOpen(false);
  }

  // функция изменения данных пользователя
  function handleUpdateUser(name, email) {
    setIsUserSending(true);
    api
      .editUserProfile(name, email)
      .then(userData => {
        setCurrentUser(userData);
        handleInfoTooltipOpen();
        setToooltipMessage(toolMessages[toolMessage.ok]);
      })
      .catch(err => {
        console.error(err.status);
        setIsUserError({ error: err.message });
      })
      .finally(() => setIsUserSending(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route path="/" element={<Main toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
            <Route
              path="/movies"
              element={<Movies toggleMenu={toggleMenu} loggedIn={isLoggedIn} />}
            />
            <Route
              path="/saved-movies"
              element={<SavedMovies toggleMenu={toggleMenu} loggedIn={isLoggedIn} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onUpdateUser={handleUpdateUser}
                  toggleMenu={toggleMenu}
                  loggedIn={isLoggedIn}
                  userLogOut={userLogOut}
                  isSending={isUserSending}
                  userError={isUserError}
                  resetErrors={resetErrors}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onAddUser={handleNewUserReg}
                  isSending={isRegisterSending}
                  userError={isUserError}
                  resetErrors={resetErrors}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  onUserLogin={handleUserLogin}
                  isSending={isLoginSending}
                  onUserLogOut={userLogOut}
                  userError={isUserError}
                  resetErrors={resetErrors}
                />
              }
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
          <Navigation isOpen={isMobileMenuOpen} toggleMenu={toggleMenu} />
        </div>
        <InfoTooltip
          onClose={closePopup}
          toooltipMessage={toooltipMessage}
          isOpen={isInfoTooltipOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

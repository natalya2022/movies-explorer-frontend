import './App.css';
import './../../index.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
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
import * as movies from '../../utils/MoviesApi.js';
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
  const [isEditableProfile, setIsEditableProfile] = useState(false);

  const [moviesAll, setMoviesAll] = useLocalStorage('movies', []);
  const [moviesCards, setMoviesCards] = useLocalStorage('filteredMovies', []);
  const [filterParameters, setFilterParameters] = useLocalStorage('filterParameters', {
    search: '',
    shorts: false
  });
  const [searchString, setSearchString] = useState(filterParameters.search);  
  const [filteredShorts, setFilteredShorts] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [flagSave, setFlagSave] = useState(false);

  const navigate = useNavigate();

  const toolMessage = { ok: 0, err: 1, search: 2 };
  const toolMessages = [
    { link: regtrue, text: 'Данные профиля изменены!' },
    { link: iconinfo, text: 'Что-то пошло не так! Попробуйте еще раз.' },
    { link: iconinfo, text: 'Нужно ввести ключевое слово!' }
  ];

  // загрузка данных пользователя
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

  // загрузка фильмов с сервера beatfilm-movies
  useEffect(() => {
    if (isLoggedIn) {
      movies
        .getMovies()
        .then(movies => {
          setMoviesAll(movies);
        })
        .catch(console.error);
    } else {
      setMoviesAll([]);
    }
  }, [isLoggedIn, setMoviesAll]);

  // загрузка сохраненных фильмов
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getMovies()
        .then(movies => {
          setSavedMovies(movies);
          setFlagSave(false);          
        })
        .catch(console.error);
    } else {
      setSavedMovies([]);
    }
  }, [isLoggedIn, flagSave]);

  // функция открытия мобильного меню
  function toggleMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // функция открытия попапа уведомения
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  //функция закрытия попапа уведомления
  const closePopup = () => {
    setIsInfoTooltipOpen(false);
  };

  // функция включения/выключения редактирования профиля
  function handleUserProfileEdit(editFlag) {
    setIsEditableProfile(editFlag);
    resetErrors();
  }

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
        handleUserLogin(res.email, password);
      })
      .catch(err => {
        console.error(err.status);
        if (err.message === 'Validation failed') {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        } else {
          setIsUserError({ error: err.message });
        }
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
        if (err.message === 'Validation failed') {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        } else {
          setIsUserError({ error: err.message });
        }
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
  function handleUserLogOut() {
    api.logOut();
    setIsLoggedIn(false);
    setCurrentUser({});
    setIsMobileMenuOpen(false);
    setMoviesCards([]);
    setSearchString('');
    setFilteredShorts(false);
    setFilterParameters({});
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
        setIsEditableProfile(false);
        resetErrors();
      })
      .catch(err => {
        console.error(err.status);
        if (err.message === 'Validation failed') {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        } else {
          setIsUserError({ error: err.message });
        }
      })
      .finally(() => setIsUserSending(false));
  }

  // функция сохранения/удаления фильма из избранного
  function handleLikeMovie(movie, likeMovieId = 0) {
    console.log(movie, likeMovieId);
    if (likeMovieId) {
      handleDelteMovie(likeMovieId); // дизлайкаем == удаляем из сохраненных
    } else {
      handleSaveMovie(movie); // лайкаем == добавляем в сохраненные
    }
  }

  // функция добавления фильма
  function handleSaveMovie(movie) {
    api
      .saveMovie(movie)
      .then(newMovie => {
        setSavedMovies([...savedMovies, newMovie]);
        //console.log(savedMovies);
      })
      .catch(console.error);
  }

  //функция удаления фильма
  function handleDelteMovie(likeMovie) {
    api
      .deleteMovie(likeMovie)
      .then(() => {
        setSavedMovies(movie => movie.filter(c => c._id !== likeMovie));
        setFlagSave(true);
      })
      .catch(console.error);
  }

  // функция перeключения короткометражек
  function handleShortsToggle() {
    setFilterParameters({ ...filterParameters, shorts: !filterParameters.shorts });
    setFilteredShorts(moviesCards.filter(item => item.duration <= 40));
  }

  // функция сохранения значения поисковой строки
  function searchChange(value) {
    setSearchString(value);
  }

  // функция фильтрации фильмов
  function handleFilterMovies(e) {
    e.preventDefault();
    if (searchString === '') {
      handleInfoTooltipOpen();
      setToooltipMessage(toolMessages[toolMessage.search]);
    }
    else {const tempMovies = moviesAll.filter(
      item =>
        item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
        item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
    setMoviesCards(tempMovies);
    setFilteredShorts(tempMovies.filter(item => item.duration <= 40));
    setFilterParameters({ ...filterParameters, search: searchString });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route path="/" element={<Main toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
            <Route
              path="/movies"
              element={
                <Movies
                  toggleMenu={toggleMenu}
                  loggedIn={isLoggedIn}
                  filterParameters={filterParameters}
                  toggleShorts={handleShortsToggle}
                  filterMovies={handleFilterMovies}
                  likeMovie={handleLikeMovie}
                  searchString={searchString}
                  searchChange={searchChange}
                  savedMovies={savedMovies}
                  moviesCards={moviesCards}
                  filteredShorts={filteredShorts}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  toggleMenu={toggleMenu}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  deleteMovie={handleDelteMovie}
                  flagSave={flagSave}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onUpdateUser={handleUpdateUser}
                  toggleMenu={toggleMenu}
                  loggedIn={isLoggedIn}
                  onUserLogOut={handleUserLogOut}
                  isSending={isUserSending}
                  userError={isUserError}
                  resetErrors={resetErrors}
                  editableProfile={isEditableProfile}
                  editProfile={handleUserProfileEdit}
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

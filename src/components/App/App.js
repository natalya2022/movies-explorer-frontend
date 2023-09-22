/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import './../../index.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { toolMessage, toolMessages, serverErrors } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import { SHORTS_DURATION } from '../../utils/constants';

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
  const [filteredShorts, setFilteredShorts] = useLocalStorage('filteredShorts', []);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [isRenderMovies, setIsRenderMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // загрузка данных пользователя
  useEffect(() => {
    if (isLoggedIn) {
      setIsPreloaderOpen(true);
      api
        .getUserInfo()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(err => {
          console.error(err.status);
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        })
        .finally(() => {
          setIsPreloaderOpen(false);
        });
    } else {
      setCurrentUser({});
      setIsPreloaderOpen(false);
    }
  }, [isLoggedIn]);

  // загрузка фильмов с сервиса beatfilm-movies
  useEffect(() => {
    if (isLoading) {
      setIsPreloaderOpen(true);
      movies
        .getMovies()
        .then(movies => {
          setMoviesAll(movies);
        })
        .catch(err => {
          console.error(err.status);
          setIsUserError({ error: toolMessages[toolMessage.errLoading].text });
        })
        .finally(() => {
          setIsLoading(false);
          setIsPreloaderOpen(false);
        });    
    }
  }, [isLoading]);

  useEffect(() => {
    if (moviesAll) {
      handleFilterMovies();
    }
  }, [moviesAll]);

  // загрузка сохраненных фильмов
  useEffect(() => {
    if (isLoggedIn) {
      setIsPreloaderOpen(true);
      api
        .getMovies()
        .then(movies => {
          setSavedMovies(movies);
        })
        .catch(err => {
          console.error(err.status);
          setIsUserError({ error: toolMessages[toolMessage.errLoading].text });
        })
        .finally(() => {
          setIsPreloaderOpen(false);
        });
    } else {
      setSavedMovies([]);
      setIsPreloaderOpen(false);
    }
  }, [isLoggedIn]);

  // функция открытия мобильного меню
  function toggleMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // функция открытия попапа уведомения
  function handleInfoTooltipOpen(message) {
    setIsInfoTooltipOpen(true);
    setToooltipMessage(message);
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
    setIsPreloaderOpen(true);
    resetErrors();
    api
      .register(name, email, password)
      .then(res => {
        setCurrentUser(res);
        handleUserLogin(res.email, password);
        navigate('/movies');
      })
      .catch(err => {
        console.error(err.status);
        if (serverErrors.includes(err.message)) {
          setIsUserError({ error: err.message });
        } else {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        }
      })
      .finally(() => {
        setIsRegisterSending(false);
        setIsPreloaderOpen(false);
      });
  }

  // функция авторизации пользователя
  function handleUserLogin(email, password) {
    setIsLoginSending(true);
    setIsPreloaderOpen(true);
    resetErrors();
    api
      .authorize(email, password)
      .then(res => {
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.error(err.status);
        if (serverErrors.includes(err.message)) {
          setIsUserError({ error: err.message });
        } else {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        }
      })
      .finally(() => {
        setIsLoginSending(false);
        setIsPreloaderOpen(false);
      });
  }

  // хук проверки токена
  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line
  }, []);

  // функция проверки токена
  function handleCheckToken() {
    if (isLoggedIn) {
      navigate('/');
      return;
    }
    api
      .checkToken()
      .then(res => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate(location.pathname);
      })
      .catch(err => {
        console.error(err);
        setIsLoggedIn(false);
      });
  }

  // функция выхода из системы
  function handleUserLogOut() {
    setIsPreloaderOpen(true);
    api
      .logOut()
      .then(() => {
        setCurrentUser({});
        setIsMobileMenuOpen(false);
        setMoviesCards([]);
        setSearchString('');
        setFilteredShorts([]);
        setFilterParameters({});
        setSavedMovies([]);
        setIsLoggedIn(false);
        resetErrors();
        setMoviesAll([]);
      })
      .catch(err => {
        navigate(location.pathname);
        setIsUserError({ error: toolMessages[toolMessage.err].text });
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      });
  }

  // функция изменения данных пользователя
  function handleUpdateUser(name, email) {
    setIsUserSending(true);
    setIsPreloaderOpen(true);
    resetErrors();
    api
      .editUserProfile(name, email)
      .then(userData => {
        setCurrentUser(userData);
        setIsPreloaderOpen(false);
        handleInfoTooltipOpen(toolMessages[toolMessage.ok]);
        setIsEditableProfile(false);
        resetErrors();
      })
      .catch(err => {
        console.error(err.status);
        if (serverErrors.includes(err.message)) {
          setIsUserError({ error: err.message });
        } else {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        }
      })
      .finally(() => {
        setIsUserSending(false);
        setIsPreloaderOpen(false);
      });
  }

  // функция сохранения/удаления фильма из избранного
  function handleLikeMovie(movie, likeMovieId = 0) {
    if (likeMovieId) {
      handleDelteMovie(likeMovieId); // дизлайкаем == удаляем из сохраненных
    } else {
      handleSaveMovie(movie); // лайкаем == добавляем в сохраненные
    }
  }

  // функция добавления фильма
  function handleSaveMovie(movie) {
    resetErrors();
    setIsPreloaderOpen(true);
    api
      .saveMovie(movie)
      .then(newMovie => {
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch(err => {
        console.error(err.status);
        if (serverErrors.includes(err.message)) {
          setIsUserError({ error: err.message });
        } else {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        }
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      });
  }

  //функция удаления фильма
  function handleDelteMovie(likeMovie) {
    resetErrors();
    setIsPreloaderOpen(true);
    api
      .deleteMovie(likeMovie)
      .then(() => {
        setSavedMovies(movies => movies.filter(c => c._id !== likeMovie));
      })
      .catch(err => {
        console.error(err.status);
        if (serverErrors.includes(err.message)) {
          setIsUserError({ error: err.message });
        } else {
          setIsUserError({ error: toolMessages[toolMessage.err].text });
        }
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      });
  }

  // функция перeключения короткометражек
  function handleShortsToggle() {
    setFilterParameters({ ...filterParameters, shorts: !filterParameters.shorts });
    setFilteredShorts(moviesCards.filter(item => item.duration <= SHORTS_DURATION));
    resetErrors();
  }

  // функция сохранения значения поисковой строки
  function searchChange(value) {
    setSearchString(value);
    resetErrors();
  }

  // функция сброса количества карт при рендере
  function toggleMoviesRender() {
    setIsRenderMovies(false);
  }

  // функция фильтрации фильмов
  function handleFilterMovies(e) {
    resetErrors();
    if (e) {
      e.preventDefault();
      setIsRenderMovies(true);
      if (moviesAll.length === 0) {
        setIsLoading(true);
      }
      if (searchString === '') {
        handleInfoTooltipOpen(toolMessages[toolMessage.search]);
        return;
      }
    }    
    let tempMovies = [];
    let tempMoviesShort = [];
    if (moviesAll.length) {
      tempMovies = moviesAll.filter(item => {
        try {
          return (
            item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
            item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
          );
        } catch (e) {
          return false;
        }
      });
      setMoviesCards(tempMovies);
      tempMoviesShort = tempMovies.filter(item => item.duration <= SHORTS_DURATION);
      setFilteredShorts(tempMoviesShort);
      setFilterParameters({ ...filterParameters, search: searchString });
    }
    if (
      e &&
      moviesAll.length !== 0 &&
      (tempMovies.length === 0 || (filterParameters.shorts && tempMoviesShort.length === 0))
    ) {
      moviesAll.length && handleInfoTooltipOpen(toolMessages[toolMessage.noresult]);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route path="/" element={<Main toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace={true} />
                ) : (
                  <Register
                    onAddUser={handleNewUserReg}
                    isSending={isRegisterSending}
                    userError={isUserError}
                    resetErrors={resetErrors}
                  />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace={true} />
                ) : (
                  <Login
                    onUserLogin={handleUserLogin}
                    isSending={isLoginSending}
                    userError={isUserError}
                    resetErrors={resetErrors}
                  />
                )
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  loggedIn={isLoggedIn}
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
                      userError={isUserError}
                      resetErrors={resetErrors}
                      toggleMoviesRender={toggleMoviesRender}
                      renderMovies={isRenderMovies}
                    />
                  }
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  loggedIn={isLoggedIn}
                  element={
                    <SavedMovies
                      toggleMenu={toggleMenu}
                      loggedIn={isLoggedIn}
                      savedMovies={savedMovies}
                      deleteMovie={handleDelteMovie}
                      tooltipOpen={handleInfoTooltipOpen}
                      userError={isUserError}
                      resetErrors={resetErrors}
                    />
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  loggedIn={isLoggedIn}
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
        <Preloader isOpen={isPreloaderOpen} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

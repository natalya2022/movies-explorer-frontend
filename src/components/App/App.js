import './App.css';
import './../../index.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
        .catch(console.error)
        .finally(() => {        
          setIsPreloaderOpen(false);
        });   
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
      setIsPreloaderOpen(true);
      api
        .getMovies()
        .then(movies => {
          setSavedMovies(movies);                   
        })
        .catch(console.error)
        .finally(() => {        
          setIsPreloaderOpen(false);
        });        
    } else {
      setSavedMovies([]);
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
    api
      .register(name, email, password)
      .then(res => {
        setCurrentUser(res);
        handleUserLogin(res.email, password);
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
    api.logOut();
    setIsLoggedIn(false);
    setCurrentUser({});
    setIsMobileMenuOpen(false);
    setMoviesCards([]);
    setSearchString('');
    setFilteredShorts([false]);
    setFilterParameters({});
    setSavedMovies([]);
    localStorage.removeItem('movies');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('filterParameters');
    localStorage.removeItem('filteredShorts');
  }

  // функция изменения данных пользователя
  function handleUpdateUser(name, email) {
    setIsUserSending(true);
    setIsPreloaderOpen(true);
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
    console.log(movie, likeMovieId);
    if (likeMovieId) {
      handleDelteMovie(likeMovieId); // дизлайкаем == удаляем из сохраненных
    } else {
      handleSaveMovie(movie); // лайкаем == добавляем в сохраненные
    }
  }

  // функция добавления фильма
  function handleSaveMovie(movie) {
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
    setFilteredShorts(moviesCards.filter(item => item.duration <= 40));
  }

  // функция сохранения значения поисковой строки
  function searchChange(value) {
    setSearchString(value);
  }

  // функция фильтрации фильмов
  function handleFilterMovies(e) {
    if (e) {
      e.preventDefault();
      if (searchString === '') {
        handleInfoTooltipOpen(toolMessages[toolMessage.search]);
        return;
      }
    }
    const tempMovies = moviesAll.filter(
      item =>
        item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
        item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
    setMoviesCards(tempMovies);
    const tempMoviesShort = tempMovies.filter(item => item.duration <= 40);
    setFilteredShorts(tempMoviesShort);
    setFilterParameters({ ...filterParameters, search: searchString });

    if (
      e &&
      (tempMovies.length === 0 || (filterParameters.shorts && tempMoviesShort.length === 0))
    ) {
      handleInfoTooltipOpen(toolMessages[toolMessage.noresult]);
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

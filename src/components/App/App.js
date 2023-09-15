import './App.css';
import './../../index.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Navigation from '../Navigation/Navigation';

function App() {

  // переменная для проверки работы макета header и мобильного меню
  const isLoggedIn = true;
  // const isLoggedIn = false;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMenu() {    
      setIsMobileMenuOpen(!isMobileMenuOpen);    
    }

  return (
    <div className="root">
      <div className="page">
        <Routes>
          <Route path="/" element={<Main toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
          <Route path="/movies" element={<Movies toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
          <Route path="/saved-movies" element={<SavedMovies toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<Profile toggleMenu={toggleMenu} loggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Navigation isOpen={isMobileMenuOpen} toggleMenu={toggleMenu}/>
      </div>
    </div>
  );
}

export default App;

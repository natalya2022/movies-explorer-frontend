/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { toolMessage, toolMessages } from '../../utils/constants';

const SavedMovies = ({
  toggleMenu,
  loggedIn,
  savedMovies,
  deleteMovie,
  tooltipOpen,
  userError,
  resetErrors
}) => {
  const [filterShorts, setFilterShorts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [checkBoxParameters, setCheckBoxParameters] = useState(false);

  useEffect(() => {
    resetErrors();
  }, []);

  // обновляет выдачу фильмов при обновлении страницы
  useEffect(() => {
    if (savedMovies) {
      handleFilterMovies();
    }
  }, [savedMovies]);

  // функция перeключения короткометражек для избранного
  function handleShortsToggle() {
    setCheckBoxParameters(!checkBoxParameters);
  }

  // функция сохранения значения поисковой строки для избранного
  function searchChange(value) {
    setSearchString(value);
  }

  // функция фильтрации фильмов избранного
  function handleFilterMovies(e) {
    if (e) {
      e.preventDefault();
      if (searchString === '' && savedMovies.length > 0) {
        tooltipOpen(toolMessages[toolMessage.search]);
        return;
      }
    }

    const tempMovies = savedMovies.filter(
      item =>
        item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
        item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
    setFilteredMovies(tempMovies);
    const tempMoviesShort = tempMovies.filter(item => item.duration <= 40);
    setFilterShorts(tempMoviesShort);

    if (e && (tempMovies.length === 0 || (checkBoxParameters && tempMoviesShort.length === 0))) {
      tooltipOpen(toolMessages[toolMessage.noresult]);
    }

    if (e && savedMovies.length === 0) {
      tooltipOpen(toolMessages[toolMessage.empty]);
    }
  }

  return (
    <div className="page-wrap">
      <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm
          toggleShorts={handleShortsToggle}
          filterShorts={checkBoxParameters}
          searchChange={searchChange}
          searchString={searchString}
          filterMovies={handleFilterMovies}
        />
        <MoviesCardList
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
          moviesCards={!checkBoxParameters ? filteredMovies : filterShorts}
          userError={userError}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SavedMovies;

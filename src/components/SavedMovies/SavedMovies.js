import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ toggleMenu, loggedIn, savedMovies, deleteMovie, flagSave }) => {
  const [filterShorts, setFilterShorts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [checkBoxParameters, setCheckBoxParameters] = useState(false);

  useEffect(() => {
    if (flagSave) {
      handleFilterMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagSave]);

  // функция перeключения короткометражек для избранного
  function handleShortsToggle() {
    setCheckBoxParameters(!checkBoxParameters);
    setFilterShorts(savedMovies.filter(item => item.duration <= 40));
  }

  // функция сохранения значения поисковой строки для избранного
  function searchChange(value) {
    setSearchString(value);
  }

  // функция фильтрации фильмов избранного
  function handleFilterMovies(e) {
    if (e) {
      e.preventDefault();     
    }
    const tempMovies = savedMovies.filter(
      item =>
        item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
        item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
    setFilteredMovies(tempMovies);
    setFilterShorts(tempMovies.filter(item => item.duration <= 40));
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
        />
      </main>
      <Footer />
    </div>
  );
};

export default SavedMovies;

import React, { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import * as api from '../../utils/MainApi.js';
import * as movies from '../../utils/MoviesApi.js';

const Movies = ({ toggleMenu, loggedIn }) => {
  const [moviesAll, setMoviesAll] = useLocalStorage('movies', []);
  const [moviesCards, setMoviesCards] = useLocalStorage('filteredMovies', []);
  const [filterParameters, setFilterParameters] = useLocalStorage('filterParameters', {search: '', shorts: false});
  const [filteredShorts, setFilteredShorts] = useState([]);
  const [searchString, setSearchString] = useState(filterParameters.search);

  // загрузка фильмов с сервера
  useEffect(() => {
    if (loggedIn) {
      movies
        .getMovies()
        .then(movies => {         
          setMoviesAll(movies);
          console.log(movies);
        })
        .catch(console.error);
    } else {
      setMoviesAll([]);
    }
  }, [loggedIn, setMoviesAll]);

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
function filterMovies() {
    setMoviesCards(moviesAll.filter(item => item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 || item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1));   
    setFilterParameters({ ...filterParameters, search: searchString });
}

  return (
    <div className="page-wrap">
      <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm filterParameters={filterParameters} toggleShorts={handleShortsToggle} filterMovies={filterMovies} searchChange={searchChange} searchString={searchString}/>
        <MoviesCardList moviesCards={!filterParameters.shorts ? moviesCards : filteredShorts } />
      </main>
      <Footer />
    </div>
  );
};

export default Movies;

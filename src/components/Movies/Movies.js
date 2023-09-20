import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({
  toggleMenu,
  loggedIn,
  filterParameters,
  toggleShorts,
  filterMovies,
  searchString,
  likeMovie,
  savedMovies,
  moviesCards,
  filteredShorts,
  searchChange,
  userError,  
}) => {
  return (
    <div className="page-wrap">
      <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          filterShorts={filterParameters.shorts}
          toggleShorts={toggleShorts}
          filterMovies={filterMovies}
          searchChange={searchChange}
          searchString={searchString}
        />
        <MoviesCardList
          moviesCards={!filterParameters.shorts ? moviesCards : filteredShorts}
          likeMovie={likeMovie}
          savedMovies={savedMovies}
          userError={userError}                      
        />
      </main>
      <Footer />
    </div>
  );
};

export default Movies;

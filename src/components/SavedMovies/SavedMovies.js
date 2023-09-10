import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ toggleMenu, loggedIn }) => {
  return (
    <>
    <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
    <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
    </main>
    <Footer />
</>
  )
}

export default SavedMovies;
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


const Movies = ({ toggleMenu, loggedIn }) => {
    return (
        <>
            <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    )
}

export default Movies;

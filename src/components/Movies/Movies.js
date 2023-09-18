import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ toggleMenu, loggedIn,filterParameters, toggleShorts, filterMovies, searchString, likeMovie, savedMovies, moviesCards, filteredShorts, searchChange }) => {
  // const [moviesAll, setMoviesAll] = useLocalStorage('movies', []);
  // const [moviesCards, setMoviesCards] = useLocalStorage('filteredMovies', []);
  // const [filterParameters, setFilterParameters] = useLocalStorage('filterParameters', {
  //   search: '',
  //   shorts: false
  // });
  // const [filteredShorts, setFilteredShorts] = useState([]);
  // const [searchString, setSearchString] = useState(filterParameters.search);
  // const [savedMovies, setSavedMovies] = useLocalStorage('savedMovies', []);

  // загрузка фильмов с сервера
  // useEffect(() => {
  //   if (loggedIn) {
  //     movies
  //       .getMovies()
  //       .then(movies => {
  //         setMoviesAll(movies);
  //         console.log(movies);
  //       })
  //       .catch(console.error);
  //   } else {
  //     setMoviesAll([]);
  //     // setMoviesCards([]);
  //     // setFilteredShorts(false);
  //     // setFilterParameters([]);
  //   }
  // }, [loggedIn, setMoviesAll]);

  // функция перeключения короткометражек
  // function handleShortsToggle() {
  //   setFilterParameters({ ...filterParameters, shorts: !filterParameters.shorts });
  //   setFilteredShorts(moviesCards.filter(item => item.duration <= 40));
  // }

  // функция сохранения значения поисковой строки
  // function searchChange(value) {
  //   setSearchString(value);
  // }

  // функция фильтрации фильмов
  // function filterMovies() {
  //   setMoviesCards(
  //     moviesAll.filter(
  //       item =>
  //         item.nameRU.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
  //         item.nameEN.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
  //     )
  //   );
  //   setFilterParameters({ ...filterParameters, search: searchString });
  // }

  // сохранение фильма
  // function handleSaveMovie(movie, likeMovie = 0) {
  //   console.log(movie, likeMovie);
  //   if (likeMovie) {
  //     // дизлайкаем == удаляем из сохранённых
  //     api
  //       .deleteMovie(likeMovie)
  //       .then(() => {
  //         setSavedMovies(movie => movie.filter(c => c._id !== likeMovie));
  //       })
  //       .catch(console.error);
  //   } else {
  //     // лайкаем == добавляем в сохранённые
  //     api
  //       .saveMovie(movie)
  //       .then(newMovie => {
  //         setSavedMovies([...savedMovies, newMovie]);
  //         console.log(savedMovies);
  //       })
  //       .catch(console.error);
  //   }
  // }

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
          />
        </main>
        <Footer />
      </div>   
  );
};

export default Movies;

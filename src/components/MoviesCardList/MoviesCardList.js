/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { COUNT_FIRST, COUNT_ADD, countSelectorArray } from '../../utils/constants';

const MoviesCardList = ({
  moviesCards,
  likeMovie,
  savedMovies,
  deleteMovie,
  userError,
  toggleMoviesRender,
  renderMovies
}) => {
  const [countMovies, setCountMovies] = useState(countSelector(COUNT_FIRST));

  // навешивет слушатель, который при изменении разрешения
  // вызывает функцию пересчета кол-ва карточек
  // расчет содержится в массиве countSelectorArray

  useEffect(() => {
    let timeout;

    const handleResize = e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCountMovies(countSelector(COUNT_FIRST));
      }, 10);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [countMovies, countSelector]);

  function countSelector(first, width = window.innerWidth) {
    return countSelectorArray.find(item => item[0] >= width)[first];
  }

  useEffect(() => {
    if (renderMovies) {
      setCountMovies(countSelector(COUNT_FIRST));
      renderMovies && toggleMoviesRender();
    }
  }, [renderMovies]);

  // функция добавления карточек по кнопке Еще
  function outputCount() {
    setCountMovies(countMovies + countSelector(COUNT_ADD));
  }

  const location = useLocation();

  return (
    <section className="movies-grid" aria-label="Фотогалерея">
      {location.pathname === '/movies' ? (
        <>
          <span className="movies-grid__error movies-grid__error_visible">
            {userError.error || ''}
          </span>
          <ul className="movies-grid__places">
            {moviesCards
              .filter((_, index) => index < countMovies)
              .map(moviesCard => (
                <MoviesCard
                  moviesCard={moviesCard}
                  key={moviesCard.id}
                  likeMovie={likeMovie}
                  savedMovies={savedMovies}
                />
              ))}
          </ul>
          <div className="movies-grid__more">
            {countMovies < moviesCards.length ? (
              <ButtonUniversal
                className={'button-more'}
                buttonText={'Еще'}
                type={'button'}
                onClick={outputCount}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <span className="movies-grid__error movies-grid__error_visible">
            {userError.error || ''}
          </span>
          <ul className="movies-grid__places movies-grid__indent">
            {moviesCards.map(moviesCard => {
              return (
                <MoviesCard
                  key={moviesCard._id}
                  moviesCard={moviesCard}
                  savedMovies={savedMovies}
                  deleteMovie={deleteMovie}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default MoviesCardList;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { COUNT_FIRST, COUNT_ADD, countSelectorArray } from '../../utils/constants';

const MoviesCardList = ({ moviesCards, likeMovie, savedMovies, deleteMovie }) => {
  const [countMovies, setCountMovies] = useState(countSelector(COUNT_FIRST));
  console.log('**', moviesCards);

  // навешивет слушатель, который при изменении разрешения
  // вызывает функцию пересчета кол-ва карточек
  // расчет содержится в массиве countSelectorArray
  // текущие параметры добавления: при изменении экран
  // показывает количество карт как при первоначальной загрузке
  useEffect(() => {
    let timeout;

    const handleResize = e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // const column = countSelector(COUNT_LINE);
        // setCountMovies(Math.ceil(countMovies / column) * column);
        setCountMovies(countSelector(COUNT_FIRST));
      }, 10);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [countMovies, countSelector]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function countSelector(first, width = window.innerWidth) {
    return countSelectorArray.find(item => item[0] >= width)[first];
  }

  // функция добавления карточек по кнопке
  function outputCount() {
    setCountMovies(countMovies + countSelector(COUNT_ADD));
  }

  const location = useLocation();

  return (
    <section className="movies-grid" aria-label="Фотогалерея">
      {location.pathname === '/movies' ? (
        <>
          <ul className="movies-grid__places">
            {moviesCards.map((moviesCard, index) => {
              return index < countMovies ? (
                <MoviesCard
                  moviesCard={moviesCard}
                  key={moviesCard.id}
                  likeMovie={likeMovie}
                  savedMovies={savedMovies}
                />
              ) : (
                <></>
              );
            })}
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
          <ul className="movies-grid__places">
            {moviesCards.map((moviesCard, index) => {
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

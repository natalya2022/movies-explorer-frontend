import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { COUNT_FIRST, COUNT_ADD, COUNT_LINE, countSelectorArray } from '../../utils/constants';

const MoviesCardList = ({ moviesCards }) => { 

  const [countMovies, setCountMovies] = useState(countSelector(COUNT_FIRST));

  // навешивет слушатель, который при изменении разрешения
  // вызывает функцию пересчета кол-ва карточек
  useEffect(() => {
    let timeout;

    const handleResize = event => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const column = countSelector(COUNT_LINE);
        setCountMovies(Math.ceil(countMovies / column) * column);
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
                <MoviesCard moviesCard={moviesCard} key={moviesCard.id} index={index} />
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
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
          </ul>
          <div className="movies-grid__more">
            <ButtonUniversal
              className={'button-more button-more_hidden'}
              buttonText={'Еще'}
              type={'button'}
              onClick={outputCount}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default MoviesCardList;

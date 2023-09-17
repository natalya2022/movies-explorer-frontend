import React from 'react';
import { useLocation } from 'react-router-dom';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { BASE_URL } from '../../utils/constants';

const MoviesCard = ({ moviesCard, index }) => {
  // переменная изменения вида кнопки "избранное"
  const location = useLocation();

  function durationFormat() {
    const hour = parseInt(moviesCard.duration / 60);
    let min = moviesCard.duration % 60;
    let str = '';
    if (hour) {
      str += hour + 'ч';
      if (min < 10) {
        min = '0' + min;
      }
    }
    if (min) {
      str += min + 'м';
    }
    return str;
  }

  function imageFormat() {
    return `${BASE_URL}${moviesCard?.image?.url}`;
  }

  return (
    <li className="movies-grid__place">
      <img src={imageFormat()} alt="Фильм" className="movies-grid__picture" />
      <div className="movies-grid__rectangle">
        <div className="movies-grid__info">
          <h2 className="movies-grid__title">{moviesCard.nameRU}</h2>
          <p className="movies-grid__duration">{index}) {durationFormat()}</p>
        </div>
        {location.pathname === '/movies' ? (
          <ButtonUniversal
            className={'button-selectmovies'}
            classNameActive={'button-selectmovies_color'}
            type={'button'}
          />
        ) : (
          <ButtonUniversal className={'button-deletemovies'} type={'button'} />
        )}
      </div>
    </li>
  );
};

export default MoviesCard;

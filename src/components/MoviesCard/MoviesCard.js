import React from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIES_URL } from '../../utils/constants';

const MoviesCard = ({ moviesCard, likeMovie, savedMovies, deleteMovie }) => {
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
    return location.pathname === '/movies' ? MOVIES_URL + moviesCard?.image?.url : moviesCard.image;
  }

  const likeMovieId =
    location.pathname === '/movies'
      ? savedMovies.find(movie => movie.movieId === moviesCard.id)?._id
      : moviesCard._id;

  return (
    <li className="movies-grid__place" >
      <img src={imageFormat()} alt={moviesCard.nameRU} className="movies-grid__picture" onClick={() => window.open(`${moviesCard.trailerLink}`)}/>
      <div className="movies-grid__rectangle">
        <div className="movies-grid__info">
          <h2 className="movies-grid__title">{moviesCard.nameRU}</h2>
          <p className="movies-grid__duration">{durationFormat()}</p>
        </div>
        {location.pathname === '/movies' ? (
          <button
            className={'button-selectmovies' + (likeMovieId ? ' button-selectmovies_color' : '')}
            type={'button'}
            onClick={() => likeMovie(moviesCard, likeMovieId)}
          />
        ) : (
          <button
            className="button-deletemovies"
            type="button"
            onClick={() => deleteMovie(likeMovieId)}
          />
        )}
      </div>
    </li>
  );
};

export default MoviesCard;

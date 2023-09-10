import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';

const MoviesCardList = () => {

  // переменная location меняет верстку для проверки макета, при малом количестве или отсуствии фильмов кнопка Еще отключается, footer остается внизу

  const location = useLocation();

  return (
    <section className="movies-grid" aria-label="Фотогалерея">
      {location.pathname === '/movies' ?
        <>
          <ul className="movies-grid__places">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
          </ul>
          <div className="movies-grid__more">
            <ButtonUniversal className={"button-more"} buttonText={"Еще"} />
          </div>
        </>
        :
        <>
          <ul className="movies-grid__places">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />        
          </ul>
          <div className="movies-grid__more">
            <ButtonUniversal className={"button-more button-more_hidden"} buttonText={"Еще"} />
          </div>
        </>
      }
    </section>
  )
}

export default MoviesCardList;
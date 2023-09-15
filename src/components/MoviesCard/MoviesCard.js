import React from 'react';
import { useLocation } from 'react-router-dom';
import samplepicture from '../../images/sample.png';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';


const MoviesCard = () => {

    // переменная изменения вида кнопки "избранное"
    const location = useLocation();


    return (
        <li className="movies-grid__place">
            <img
                src={samplepicture}
                alt="Фильм"
                className="movies-grid__picture"
            />
            <div className="movies-grid__rectangle">
                <div className="movies-grid__info">
                    <h2 className="movies-grid__title">33 слова о дизайне</h2>
                    <p className="movies-grid__duration">1ч42м</p>
                </div>
                {location.pathname === '/movies' ?
                    <ButtonUniversal className={"button-selectmovies"} classNameActive={"button-selectmovies_color"} type={"button"} />
                    : <ButtonUniversal className={"button-deletemovies"} type={"button"} />
                }
            </div>
        </li>
    );
};

export default MoviesCard;
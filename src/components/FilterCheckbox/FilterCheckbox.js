import React from 'react';

const FilterCheckbox = () => {

    // Функция для проверки чекбокса в макете
    const checkSwitch = (evt) => evt.target.classList.toggle("checkbox__button_on");

    return (
        <div className="checkbox">
            <div className="checkbox__button checkbox__button_on" onClick={checkSwitch}></div>
            <p className="checkbox__text">Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;
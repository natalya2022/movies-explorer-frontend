import React from 'react';

const FilterCheckbox = ({ checkboxState, toggleShorts }) => {
    console.log(checkboxState);

    // Функция для проверки чекбокса в макете
    // const checkSwitch = (evt) => evt.target.classList.toggle("checkbox__button_on");

    return (
        <div className="checkbox">
            <div className={`checkbox__button ${checkboxState ? 'checkbox__button_on' : ''}`} onClick={toggleShorts}></div>
            <p className="checkbox__text">Короткометражки</p>
        </div>
    )
}

export default FilterCheckbox;
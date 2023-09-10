import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import vertical from '../../images/vertical.svg';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';

const SearchForm = () => {
    return (
        <section className="search">
            <div className="search__container">
                <form className="search__form">
                    <input className="search__input" type="text" placeholder="Фильм" required autoFocus size="10"/>                    
                    <ButtonUniversal className={"button-search"} type={"submit"} />
                    <img class="search__vertical-line" src={vertical} alt="Вертикальный разделитель" />
                </form>
                <div className="search__checkbox">
                    <FilterCheckbox />
                </div>
            </div>
            <hr className="search__border" />
        </section>
    )
}

export default SearchForm;
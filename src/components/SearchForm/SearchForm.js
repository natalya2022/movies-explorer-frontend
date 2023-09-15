import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';

const SearchForm = () => {
    return (
        <section className="search">
            <form className="search__form">
                <div className="search__container">
                    <div className="search__bar">
                        <input className="search__input" type="text" placeholder="Фильм" required autoFocus size="10" />
                        <ButtonUniversal className={"button-search"} type={"submit"} />
                    </div>
                    <div className="search__checkbox">
                        <FilterCheckbox />
                    </div>
                </div >
            </form>
            <hr className="search__border" />
        </section >
    )
}

export default SearchForm;
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';

const SearchForm = ({ filterShorts, toggleShorts, filterMovies, searchChange, searchString }) => {  

  return (
    <section className="search">
      <form className="search__form" name="form-search" noValidate>
        <div className="search__container">
          <div className="search__bar">
            <input
              className="search__input"
              id="form-search-string"
              name="search-string"
              type="text"
              placeholder="Фильм"
              required
              autoFocus
              size="10"
              onChange={e => searchChange(e.target.value)}
              value={searchString}
            />
            <ButtonUniversal className={'button-search'} type={'submit'} onClick={filterMovies} />
          </div>
          <div className="search__checkbox">
            <FilterCheckbox checkboxState={filterShorts} toggleShorts={toggleShorts} />
          </div>
        </div>
      </form>
      <hr className="search__border" />
    </section>
  );
};

export default SearchForm;

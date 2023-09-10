import React from 'react';
import Header from '../Header/Header';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { Link } from 'react-router-dom';

const Profile = ({ toggleMenu, loggedIn }) => {
  return (
    <>
      <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
      <main className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <div className="profile__fill">
            <label className="profile__label" for="form-name">Имя</label>
            <input type="text" className="profile__name profile__input" id="form-name" placeholder="Виталий" minLength={2} maxLength={30} />
          </div>
          <div className="profile__fill">
            <label className="profile__label" for="form-email">E-mail</label>
            <input type="email" className="profile__email profile__input" id="form-email" placeholder="pochta@yandex.ru" />
          </div>
          <div className="profile__nav">
            <ButtonUniversal className={"button-profile"} buttonText={"Редактировать"} />
            <Link to="/signin" className="profile__logout" >Выйти из аккаунта</Link>
          </div>
        </form>
      </main>
    </>
  )
}

export default Profile;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Header from '../Header/Header';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';

const Profile = ({ toggleMenu, loggedIn, userLogOut, onUpdateUser, isSending, userError, resetErrors }) => {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    resetErrors();
  }, []);

  function editable() {
    setIsEditable(true);
    resetErrors();
    console.log('Редактирование');
    // document.getElementById('form-update-name').focus();
  }

  const invalidButton = !isValid || isSending || (currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
  }, [resetForm, currentUser.name, currentUser.email]);

  const handleSubmit = e => {
    e.preventDefault();
    if (invalidButton) {
      return;
    }
    setIsEditable(false);
    onUpdateUser({ name: values.name, email: values.email });
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} loggedIn={loggedIn} />
      <main className="profile">
        <section className="profile__content">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" name="form-update" onSubmit={handleSubmit} noValidate>
            <div className="profile__fill">
              <label className="profile__label" htmlFor="form-update-name">
                Имя
              </label>
              <input
                type="text"
                className="profile__name profile__input"
                id="form-update-name"
                placeholder="Ваше имя"
                minLength={2}
                maxLength={30}
                name="name"
                disabled={!isEditable}
                onChange={handleChange}
                value={values.name || ''}
              />
            </div>
            <span className="form-update-error regauto__error-visible">{errors.name || ''}</span>
            <div className="profile__fill">
              <label className="profile__label" htmlFor="form-update-email">
                E-mail
              </label>
              <input
                type="email"
                className="profile__email profile__input"
                id="form-update-email"
                placeholder="Ваш email"
                name="email"
                disabled={!isEditable}
                onChange={handleChange}
                value={values.email || ''}
              />
            </div>
            <span className="form-update-error regauto__error-visible">{errors.email || ''}</span>
            <div className="profile__nav">
              <span className="profile__error profile__error_visible regauto__error-visible">{userError.error || ''}</span>
              {!isEditable ? (
                <>
                  <ButtonUniversal
                    className={'button-profile'}
                    buttonText={'Редактировать'}
                    type={'button'}
                    onClick={editable}
                  />
                  <Link to="/" className="profile__logout" onClick={userLogOut}>
                    Выйти из аккаунта
                  </Link>
                </>
              ) : (
                <ButtonUniversal
                  className={`button-reg-login ${invalidButton ? 'button-reg-login_disabled' : ''}`}
                  buttonText={isSending ? 'Сохранение...' : 'Сохранить'}
                  type={'submit'}
                  onClick={console.log('Сохраняем')}
                  disabled={invalidButton}
                />
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;

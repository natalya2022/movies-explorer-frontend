/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import { REGEXP_EMAIL } from '../../utils/regex';

const Profile = ({
  toggleMenu,
  loggedIn,
  userLogOut,
  onUpdateUser,
  isSending,
  userError,
  resetErrors,
  editableProfile,
  editProfile
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  const invalidButton =
    !isValid ||
    isSending ||
    (currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    editProfile(false);
    resetErrors();
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false);
  }, [resetForm, currentUser.name, currentUser.email]);

  const handleSubmit = e => {
    e.preventDefault();
    if (invalidButton) {
      return;
    }
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
                required
                disabled={!editableProfile}
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
                pattern={REGEXP_EMAIL}
                required
                disabled={!editableProfile}
                onChange={handleChange}
                value={values.email || ''}
              />
            </div>
            <span className="form-update-error regauto__error-visible">{errors.email || ''}</span>
            <div className="profile__nav">
              <span className="profile__error profile__error_visible">{userError.error || ''}</span>
              {!editableProfile ? (
                <>                
                  <button
                    className="profile__button-edit"
                    type="button"
                    onClick={() => {
                      editProfile(true);
                    }}
                  >
                    Редактировать
                  </button>
                  <Link to="/" className="profile__logout" onClick={userLogOut}>
                    Выйти из аккаунта
                  </Link>
                </>
              ) : (              
                <button
                  className={`profile__button ${invalidButton ? 'profile__button_disabled' : ''}`}
                  type="submit"
                  disabled={invalidButton}
                >
                  {isSending ? 'Сохранение...' : 'Сохранить'}
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;

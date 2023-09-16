/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Logo from '../Logo/Logo';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';

const Register = ({ onAddUser, isSending, userError, resetErrors }) => {
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => {
    resetErrors();
  }, []);

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  const handleSubmit = e => {
    e.preventDefault();
    resetErrors();
    onAddUser(values.name, values.email, values.password);
  };

  return (
    <main className="register">
      <section className="register__content">
        <div className="register__logowrapper">
          <Logo />
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form className="register__form" name="form-register" onSubmit={handleSubmit} noValidate>
          <div className="register__fill">
            <label className="register__label" htmlFor="form-register-name">
              Имя
            </label>
            <input
              type="text"
              className={`register__email register__input ${
                errors.name ? 'register__input_error' : ''
              }`}
              id="form-register-name"
              placeholder="Виталий"
              size="10"
              name="name"
              required
              minLength={2}
              maxLength={30}
              autoFocus
              onChange={handleChange}
              value={values.name}
            />
          </div>
          <span className="form-register-error regauto__error-visible">{errors.name || ''}</span>
          <div className="register__fill">
            <label className="register__label" htmlFor="form-register-email">
              E-mail
            </label>
            <input
              type="email"
              className={`register__email register__input ${
                errors.email ? 'register__input_error' : ''
              }`}
              id="form-register-email"
              placeholder="pochta@yandex.ru"
              size="10"
              name="email"
              required
              onChange={handleChange}
              value={values.email}
            />
            <span className="form-register-error regauto__error-visible">{errors.email || ''}</span>
          </div>
          <div className="register__fill">
            <label className="register__label" htmlFor="form-register-pass">
              Пароль
            </label>
            <input
              type="password"
              className={`register__email register__input ${
                errors.password ? 'register__input_error' : ''
              }`}
              id="form-register-pass"
              size="10"
              minLength={8}
              maxLength={30}
              required
              name="password"
              placeholder="•••••"
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <span className="form-register-error regauto__error-visible">
            {errors.password || ''}
          </span>
          <div className="register__nav">
            <span className="profile__error profile__error_visible regauto__error-visible">
              {userError.error || ''}
            </span>
            <ButtonUniversal
              className={`button-reg-login ${
                !isValid || isSending ? 'button-reg-login_disabled' : ''
              }`}
              buttonText={isSending ? 'Регистрация...' : 'Зарегистрироваться'}
              type={'submit'}
              disabled={!isValid || isSending}
            />
            <p className="register__text">
              Уже зарегистрированы?&nbsp;
              <Link to="/signin" className="register__login">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import { REGEXP_EMAIL } from '../../utils/regex';

const Register = ({ onAddUser, isSending, userError, resetErrors }) => {
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => {
    resetErrors();
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
              placeholder="Ваше имя"
              size="10"
              name="name"
              required
              minLength={2}
              maxLength={30}
              autoFocus
              onChange={handleChange}
              value={values.name || ''}
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
              placeholder="Ваш email"
              size="10"
              name="email"
              pattern={REGEXP_EMAIL}
              required
              onChange={handleChange}
              value={values.email || ''}
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
              placeholder="Ваш пароль"
              onChange={handleChange}
              value={values.password || ''}
            />
          </div>
          <span className="form-register-error regauto__error-visible">
            {errors.password || ''}
          </span>
          <div className="register__nav">
            <span className="register__error register__error_visible">{userError.error || ''}</span>
            <button
              className={`register__button ${
                !isValid || isSending ? 'register__button_disabled' : ''
              }`}
              type="submit"
              disabled={!isValid || isSending}
            >
              {isSending ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import { regexpEmail } from '../../utils/regex';

const Login = ({ onUserLogin, isSending, userError, resetErrors }) => {
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => {
    resetErrors();
    resetForm({}, {}, false);
  }, [resetForm]);

  const handleSubmit = e => {
    e.preventDefault();
    resetErrors();
    onUserLogin(values.email, values.password);
  };

  return (
    <main className="login">
      <section className="login__content">
        <div className="login__logowrapper">
          <Logo />
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="login__form" name="form-login" onSubmit={handleSubmit} noValidate>
          <div className="login__fill">
            <label className="login__label" htmlFor="form-login--email">
              E-mail
            </label>
            <input
              type="email"
              className={`login__email login__input ${errors.email ? 'login__input_error' : ''}`}
              id="form-login-email"
              name="email"
              placeholder="Ваш email"
              size="10"
              pattern={regexpEmail}
              required
              autoFocus
              onChange={handleChange}
              value={values.email || ''}
            />
          </div>
          <span className="form-login-error regauto__error-visible">{errors.email || ''}</span>
          <div className="login__fill">
            <label className="login__label" htmlFor="form-pass">
              Пароль
            </label>
            <input
              type="password"
              className={`login__email login__input ${errors.email ? 'login__input_error' : ''}`}
              id="form-login-pass"
              size="10"
              required
              minLength={8}
              maxLength={30}
              name="password"
              placeholder="Ваш пароль"
              onChange={handleChange}
              value={values.password || ''}
            />
          </div>
          <span className="form-login-error regauto__error-visible">{errors.password || ''}</span>
          <div className="login__nav">
            <span className="login__error login__error_visible">{userError.error || ''}</span>
            <button
              className={`login__button ${!isValid || isSending ? 'login__button_disabled' : ''}`}
              type="submit"
              disabled={!isValid || isSending}
            >
              {isSending ? 'Авторизация...' : 'Войти'}
            </button>
            <p className="login__text">
              Еще не зарегистрированы?&nbsp;
              <Link to="/signup" className="login__register">
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;

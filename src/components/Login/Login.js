import React, { useEffect } from 'react';
import Logo from '../Logo/Logo';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';

const Login = ({ onUserLogin, isSending }) => {
  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  const handleSubmit = e => {
    e.preventDefault();
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
              placeholder="pochta@yandex.ru"
              size="10"
              required
              autoFocus
              onChange={handleChange}
              value={values.email}
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
              placeholder="•••••"
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <span className="form-login-error regauto__error-visible">{errors.password || ''}</span>
          <div className="login__nav">
            <ButtonUniversal
              className={`button-reg-login ${
                !isValid || isSending ? 'button-reg-login_disabled' : ''
              }`}
              buttonText={isSending ? 'Авторизация...' : 'Войти'}
              type={'submit'}
              disabled={!isValid || isSending}
            />
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

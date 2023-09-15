import React from 'react';
import Logo from '../Logo/Logo';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <main className="login">
      <section className="login__content">
        <div className="login__logowrapper">
          <Logo />
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="login__form">
          <div className="login__fill">
            <label className="login__label" htmlFor="form-email">E-mail</label>
            <input type="email" className="login__email login__input" id="form-email" placeholder="pochta@yandex.ru" size="10" required autoFocus />
          </div>
          <div className="login__fill">
            <label className="login__label" htmlFor="form-pass">Пароль</label>
            <input type="password" className="login__pass login__input" id="form-pass" size="10" required minLength={8} maxLength={30} placeholder="••••••••••••••" />
          </div>
          <div className="login__nav">
            <ButtonUniversal className={"button-reg-login"} buttonText={"Войти"} type={"submit"} />
            <p className="login__text">
              Еще не зарегистрированы?&nbsp;
              <Link to="/signup" className="login__register" >Регистрация</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login;
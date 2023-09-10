import React from 'react';
import Logo from '../Logo/Logo';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';
import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <main className="register">
      <div className="register__logowrapper">
        <Logo />
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <form className="register__form">
        <div className="register__fill">
          <label className="register__label" for="form-name">Имя</label>
          <input type="text" className="register__name register__input" id="form-name" placeholder="Виталий" size="10" required
            minLength={2} maxLength={30} autoFocus/>
        </div>
        <div className="register__fill">
          <label className="register__label" for="form-email">E-mail</label>
          <input type="email" className="register__email register__input" id="form-email" placeholder="pochta@yandex.ru" size="10" />
        </div>
        <div className="register__fill">
          <label className="register__label" for="form-pass">Пароль</label>
          <input type="password" className="register__pass register__input" id="form-pass" size="10" minLength={8} maxLength={30} />
        </div>
        <div className="register__nav">
          <ButtonUniversal className={"button-reg-login"} buttonText={"Зарегистрироваться"} />
          <p className="register__text">
            Уже зарегистрированы?&nbsp;
            <Link to="/signin" className="register__login" >Войти</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Register;
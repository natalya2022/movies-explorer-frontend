import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';

const Header = ({ toggleMenu, loggedIn, ...props }) => {      

    const location = useLocation();

    return (
        <header className={`header ${props.className ? props.className : ''}`}>
            <Logo />
            {loggedIn ?
                <div className="header__navbar">
                    <div className="header__avtorised">
                        <Link to="/movies" className={`header__link ${location.pathname === "/movies" ? 'header__link_dark' : ''}`}>Фильмы</Link>
                        <Link to="/saved-movies" className={`header__link ${location.pathname === "/saved-movies" ? 'header__link_dark' : ''}`}>Сохранённые фильмы</Link>
                    </div>                    
                    <Link to="/profile" className="header__acc"></Link>    
                    <ButtonUniversal className={"button-burger"} onClick={toggleMenu}/>    
                </div>
                :
                <div className="header__unavtorised">
                    <Link to='/signup' className='header__link_unavtorised'>Регистрация</Link>
                    <Link to="/signin" className="header__login">Войти</Link>    
                </div>
            }
        </header>
    );
};

export default Header;

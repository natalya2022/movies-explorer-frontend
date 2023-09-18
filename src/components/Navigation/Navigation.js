import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ButtonUniversal from '../ButtonUniversal/ButtonUniversal';

const Navigation = ({ isOpen, toggleMenu }) => {

    const location = useLocation();

    return (
        <div className={`menu ${isOpen ? 'menu_opened' : ''}`}>
            <div className="menu__wrap">
                <div className="menu__container">
                    <ButtonUniversal className={"button-menu"} onClick={toggleMenu} type={"button"} />
                    <nav className="menu__links">
                        <Link to="/" className={`menu__link ${location.pathname === "/" ? 'menu__link_active' : ''}`} onClick={toggleMenu}>Главная</Link>
                        <Link to="/movies" className={`menu__link ${location.pathname === "/movies" ? 'menu__link_active' : ''}`} onClick={toggleMenu} >Фильмы</Link>
                        <Link to="/saved-movies" className={`menu__link ${location.pathname === "/saved-movies" ? 'menu__link_active' : ''}`} onClick={toggleMenu}>Сохранённые фильмы</Link>
                    </nav>
                    <Link to="/profile" className="menu__acc" onClick={toggleMenu}></Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation;
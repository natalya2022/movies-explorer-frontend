import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__skills">
        <p className="footer__year">© {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <Link to="https://practicum.yandex.ru/" className="footer__link" target="_blank">
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__list-item">
            <Link to="https://github.com/" className="footer__link" target="_blank">
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

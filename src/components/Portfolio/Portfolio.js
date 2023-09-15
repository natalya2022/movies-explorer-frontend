import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2 className="portfolio__list-info">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item"><Link to="https://natalya2022.github.io/russian-travel/" className="portfolio__list-link" target="_blank">Статичный сайт</Link></li>
                <li className="portfolio__list-item"><Link to="https://natalya2022.github.io/mesto-react/" className="portfolio__list-link" target="_blank">Адаптивный сайт</Link></li>
                <li className="portfolio__list-item"><Link to="https://natalya2022.github.io/react-mesto-auth/" className="portfolio__list-link" target="_blank">Одностраничное приложение</Link></li>
            </ul>
        </section>
    )
}

export default Portfolio;
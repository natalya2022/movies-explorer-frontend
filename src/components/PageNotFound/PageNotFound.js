import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();    

    return (
        <main className="page-not-found">
            <section className="page-not-found__content">
                <h1 className="page-not-found__title">404</h1>
                <p className="page-not-found__text">Страница не найдена</p>
                <button className="page-not-found__back" onClick={() => navigate(-3)}>Назад</button>                
            </section>
        </main>
    )
}

export default PageNotFound;
import React from 'react';
import MainTitle from '../MainTitle/MainTitle';
import photo from '../../images/myphoto.jpg';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <section className="aboutme">
      <MainTitle text={"Студент"} id={"student"} />
      <div className="aboutme__article">
        <div className="aboutme__description">
          <h3 className="aboutme__subtitle">Виталий</h3>
          <p className="aboutme__info">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <Link to="https://github.com/natalya2022" className="aboutme__link" target="_blank">Github</Link>
        </div>
        <img src={photo} alt="Фото" className="aboutme__photo" />
      </div>
    </section>
  )
}

export default AboutMe;
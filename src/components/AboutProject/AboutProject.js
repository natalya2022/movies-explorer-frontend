import React from 'react';
import MainTitle from '../MainTitle/MainTitle';

export const AboutProject = () => {
    return (
        <section className="aboutproject">           
            <MainTitle text={"О проекте"} id={"project"} />
            <div className="aboutproject__articles">
                <article className="aboutproject__article">
                    <h3 className="aboutproject__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutproject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className="aboutproject__article">
                    <h3 className="aboutproject__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutproject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>
            <article className="aboutproject__bar">
                <div className="aboutproject__design-column">
                    <div className="aboutproject__blue-element">1 неделя</div>
                    <div className="aboutproject__text-element">Back-end</div>    
                </div>
                <div className="aboutproject__text-column">
                    <div className="aboutproject__grey-element">4 недели</div>
                    <div className="aboutproject__text-element">Front-end</div>
                </div>
            </article>
        </section>
    )
}

export default AboutProject;

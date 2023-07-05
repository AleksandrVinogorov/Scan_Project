import "../css/style.css"
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from 'react-router-dom';
import Slider from "../components/slider/slider";


function HomePage() {
  const token = localStorage.getItem('token');


  return (
    <>
      <Header />
      <main>
        <section className="main-page">
          <div className="main-page__content">
            <h1 className="main-page__title">сервис по поиску публикаций <br></br> о компании <br></br> по его ИНН</h1>
            <h2 className="main-page__subtitle">Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</h2>
            {token && (
              <Link to="/SearchData">
                <button className="main-page__request-btn"><p>Запросить данные</p></button>
              </Link>
            )}
          </div>
          <div className="main-page__logo">
            <img src={require("../img/2398 1.jpg")} className="image" alt="main page"></img>
            <img src={require("../img/main-page-mobile.jpg")} className="image-mobile" alt="main page"></img>
          </div>
        </section>
        <section className="info-advantages">
          <h3 className="info-advantages__title">Почему именно мы</h3>
          <Slider />
        </section>
        <section className="decor-section">
          <img className="decor-section__image" src={require("../img/decorative section.jpg")} alt="decorative img"></img>
          <img className="decor-section__image-mobile" src={require("../img/decorative section mobile.svg").default} alt="decorative img"></img>
        </section>
        <section className="tariffs">
          <h4 className="tariffs__title">наши тарифы</h4>
          <div className="tariffs__container">
            <div className="tariffs__card">
              <div className="card-head__wrapper beginner">
                <div className="card-head">
                  <div className="card-head__description">
                    <h5>Beginner</h5>
                    <p>Для небольшого исследования</p>
                  </div>
                  <img className="image__beginner" src={require("../img/beginner.svg").default} alt="beginner"></img>
                </div>
              </div>
              <div className="card-main">
                {token && (
                  <div className="card-main__current-tariff">
                    <p className="current-tariff">Текущий тариф</p>
                  </div>
                )}
                <div className="card-main__price">
                  <p className="card-main__new-price">799 ₽</p>
                  <p className="card-main__old-price"><s>1 200 ₽</s></p>
                </div>
                <p className="instalment">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                <div className="card-main__includes">
                  <p className="">В тариф входит:</p>
                  <ul className="card-main__includes-list">
                    <li>Безлимитная история запросов</li>
                    <li>Безопасная сделка</li>
                    <li>Поддержка 24/7</li>
                  </ul>
                </div>
                {!token && (
                  <button className="card-main__btn unauthorized"><p>Подробнее</p></button>
                )}
                {token && (
                  <button className="card-main__btn authorized"><p>Перейти в личный кабинет</p></button>
                )}
              </div>
            </div>
            <div className="tariffs__card">
              <div className="card-head__wrapper pro">
                <div className="card-head">
                  <div className="card-head__description">
                    <h5>Pro</h5>
                    <p>Для HR и фрилансеров</p>
                  </div>
                  <img className="image__pro" src={require("../img/pro.svg").default} alt="pro"></img>
                </div>
              </div>
              <div className="card-main">
                <div className="card-main__price">
                  <p className="card-main__new-price">1 299 ₽</p>
                  <p className="card-main__old-price"><s>2 600 ₽</s></p>
                </div>
                <p className="instalment">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                <div className="card-main__includes">
                  <p className="">В тариф входит:</p>
                  <ul className="card-main__includes-list">
                    <li>Все пункты тарифа Beginner</li>
                    <li>Экспорт истории</li>
                    <li>Рекомендации по приоритетам</li>
                  </ul>
                </div>
                <button className="card-main__btn unauthorized"><p>Подробнее</p></button>
              </div>
            </div>
            <div className="tariffs__card">
              <div className="card-head__wrapper business">
                <div className="card-head">
                  <div className="card-head__description">
                    <h5 className="card-head__black-description">Business</h5>
                    <p className="black-background">Для корпоративных клиентов</p>
                  </div>
                  <img className="image__business" src={require("../img/business.svg").default} alt="Business"></img>
                </div>
              </div>
              <div className="card-main">
                <div className="card-main__price">
                  <p className="card-main__new-price">2 379 ₽</p>
                  <p className="card-main__old-price"><s>3 700 ₽</s></p>
                </div>
                <p className="instalment-black"></p>
                <div className="card-main__includes">
                  <p className="">В тариф входит:</p>
                  <ul className="card-main__includes-list">
                    <li>Все пункты тарифа Pro</li>
                    <li>Безлимитное количество запросов</li>
                    <li>Приоритетная поддержка</li>
                  </ul>
                </div>
                <button className="card-main__btn unauthorized"><p>Подробнее</p></button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;

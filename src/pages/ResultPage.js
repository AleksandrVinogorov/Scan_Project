import Header from "../components/header"
import Footer from "../components/footer"
import { useLocation, Link } from 'react-router-dom';
import Cards from "../components/cards/cards";
import Histograms from "../components/histograms/histograms";
import { useState, useEffect } from "react";



function ResultPage() {

    const getSlideCount = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1366) {
            return 8; // Для больших экранов показывать 8 слайдов
        } else if (screenWidth >= 1200) {
            return 7;
        } else if (screenWidth >= 1080) {
            return 6;
        } else if (screenWidth >= 940) {
            return 5;
        } else if (screenWidth >= 800) {
            return 4;
        } else if (screenWidth >= 670) {
            return 3;
        } else if (screenWidth >= 540) {
            return 2;
        } else {
            return 1;
        }
    };
    const [slideCount, setSlideCount] = useState(getSlideCount());

    const [jsonData, setJsonData] = useState([]);
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [sum, setSum] = useState(0);
    const [visibleData, setVisibleData] = useState(10);
    const [currentIndex, setCurrentIndex] = useState(0);



    const { state } = useLocation();

    useEffect(() => {
        if (jsonData.length === 0 && state && state.json && state.history?.data[0]) {
            setJsonData(state.json);
            setHistory(state.history);
            setIsLoading(false);
        } else if (state && state.error) {
            setError(state.error);
            setIsLoading(false);
        }
    }, [jsonData, state]);
    useEffect(() => {
        if (state && state.history && history && history.data && history.data[0] && history.data[0].data) {
            const sum = history.data[0].data.reduce((total, item) => total + item.value, 0);
            setSum(sum)
        }
    }, [history]);

    const slideLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const slideRight = () => {
        const totalDocumentsDataLength = history.data[0].data.length;
        const maxIndex = totalDocumentsDataLength - 1;
        const endIndex = currentIndex + getSlideCount();

        if (currentIndex < maxIndex) {
            if (endIndex > maxIndex) {
                setCurrentIndex(maxIndex - (getSlideCount() - 1)); // Устанавливаем индекс среза, чтобы отображать нужное количество слайдов
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }
    };
    useEffect(() => {
        const handleResize = () => {
            const newSlideCount = getSlideCount();
            setSlideCount(newSlideCount);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleShowMore = () => {
        const newVisibleData = visibleData + 10;
        setVisibleData(newVisibleData);
    };
    return (
        <>
            <Header />
            <section className="result-page">
                <div className="result-page__wrapper">
                    <div className="result-page__head">
                        <div className="result-page__head-title">
                            <h1>Ищем. Скоро <br></br> будут результаты</h1>
                            <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
                        </div>
                        <div className="result-page__head-img">
                            <img src={require("../img/result image.jpg")} className="resilt-page_img" alt="search process"></img>
                            <img src={require("../img/search-process.svg").default} className="resilt-page_img-mobile" alt="search process"></img>
                        </div>
                    </div>
                    <div className="result-page__history">
                        <h2>Общая сводка</h2>
                        {history.data ? (
                            <p>Найдено {sum} вариантов</p>
                        ) : (
                            <>
                                {isLoading ? <p>Загрузка</p> : <p>Не удалось загрузить данные</p>}
                            </>
                        )}
                        <div className="result-page__history-slider">
                            {history.data ? (
                                <>
                                    <button onClick={slideLeft} className="info-advantages__btn">
                                        <img src={require("../img/left.svg").default} alt="<"></img>
                                    </button>
                                    <div className="slider__container">
                                        <Histograms getSlideCount={getSlideCount} currentIndex={currentIndex} history={history} />
                                    </div>
                                    <button onClick={slideRight} className="info-advantages__btn">
                                        <img src={require("../img/right.svg").default} alt=">"></img>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {isLoading
                                        ?
                                        <div className="result-page__history-slider">
                                            <button onClick={slideLeft} className="info-advantages__btn">
                                                <img src={require("../img/left.svg").default} alt="<"></img>
                                            </button>
                                            <div className="slider__container">
                                                <div className="slider__container-titles">
                                                    <p>Период</p>
                                                    <p>Всего</p>
                                                    <p>Риски</p>
                                                </div>
                                                <div className="slider__container-content-loading">
                                                    <div className="header__company-info">
                                                        <img className='header__company-info-spinner' src={require("../img/spinner.svg").default} alt='loading'></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={slideRight} className="info-advantages__btn">
                                                <img src={require("../img/right.svg").default} alt=">"></img>
                                            </button>
                                        </div>
                                        : "Не удалось загрузить данные"}
                                </>
                            )
                            }
                        </div>
                        <div className="result-page__cards">
                            <h3>Список документов</h3>
                            <div className="result-page__cards-container">
                                {jsonData.length ? (
                                    <>
                                        <div className="result-page__cards-wrapper">
                                            <Cards visibleData={visibleData} jsonData={jsonData} />
                                        </div>
                                    </>
                                ) : (
                                    <div className="result-page__cards-loader">
                                        {isLoading ? "Подождите, данные загружаются" : error || "Не удалось загрузить данные, попробуйте"} {state && <Link to="/SearchData"><span>изменить запрос</span></Link>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {history.data ? (visibleData < jsonData.length && (
                        <button className="result-page__more" onClick={handleShowMore}>
                            <p>Показать больше</p>
                        </button>
                    )) : (isLoading ? <></> : <></>)
                    }
                </div>
            </section >
            <Footer></Footer>
        </>
    )
}
export default ResultPage
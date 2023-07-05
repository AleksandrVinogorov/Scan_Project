import Header from "../components/header"
import Footer from "../components/footer"
import { useState, useEffect } from "react";
import searchObjects from "../components/requests/searchObjects";
import getHistogramData from "../components/requests/histogramData";
import { useNavigate } from 'react-router-dom';
import validateInn from "../components/validation/validation";


function SearchData() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
    }
    // Проверяем, заполнены ли обязательные поля:
    const [isFormValid, setIsFormValid] = useState(false);
    const [items, setItems] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const [searchParams, setSearchParams] = useState({
        inn: "",
        tonality: "any",
        value: "",
        fromDate: "",
        toDate: "",
        completeness: true,
        businessContext: true,
        mainRole: true,
        riskFactor: false,
        technicalNews: false,
        announcements: true,
        newsDigest: false,
    });

    const validateForm = () => {
        const errors = {};

        // Проверка даты начала и даты конца
        const fromDate = new Date(searchParams.fromDate);
        const toDate = new Date(searchParams.toDate);
        const currentDate = new Date();

        if (fromDate > toDate || fromDate > currentDate || toDate > currentDate) {
            errors.errorDate = "Введите корректные данные";
        }

        // Проверка остальных полей формы
        const innError = {};
        const isValidInn = validateInn(searchParams.inn, innError);
        if (!isValidInn) {
            errors.inn = innError.message;
        }

        if (parseInt(searchParams.value) < 1) {
            errors.value = "Обязательное поле";
        }
        if (parseInt(searchParams.value) > 1000) {
            errors.value = "Превышен лимит документов";
        }

        // Проверка обязательных полей
        if (!searchParams.fromDate) {
            errors.fromDate = "Обязательное поле";
        }

        if (!searchParams.toDate) {
            errors.toDate = "Обязательное поле";
        }

        if (!searchParams.inn) {
            errors.inn = "Обязательное поле";
        }

        if (!searchParams.value) {
            errors.value = "Обязательное поле";
        }

        setFormErrors(errors);

        // Возвращаем true, если нет ошибок
        return Object.keys(errors).length === 0;
    };
    // Обработчик изменения данных
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    useEffect(() => {
        setIsFormValid(validateForm()); // Вызываем validateForm при изменении searchParams
    }, [searchParams]);

    const handleSearch = async () => {
        navigate('/ResultPage');

        const handleSendRequest = async (encodedId) => {
            const url = 'https://gateway.scan-interfax.ru/api/v1/documents';
            const token = localStorage.getItem('token');

            const options = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ ids: encodedId }),
            };


            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    const json = await response.json();
                    const history = await getHistogramData(searchParams);
                    console.log(history)
                    navigate('/ResultPage', { state: { json, encodedId, history } });
                } else {
                    navigate('/ResultPage', { state: { error: "Не удалось загрузить данные, попробуйте" } });
                }
            } catch (error) {
                console.error(`Ошибка запроса: ${error.message}`);
                navigate('/ResultPage', { state: { error: "Не удалось загрузить данные, попробуйте" } });
            }
        };

        // отправка запроса на сервер с параметрами поиска 
        const newItems = await searchObjects(searchParams);

        // обновление состояния с полученными результатами 
        setItems(newItems);

        // передача параметров в функцию handleSendRequest 
        if (newItems !== "error") {
            const encodedId = newItems.map((item) => item.encodedId);
            try {
                await handleSendRequest(encodedId);
            } catch (error) {
                console.error(`Ошибка отправки запроса: ${error.message}`);
            }
        } else {
            navigate('/ResultPage', { state: { error: "Не удалось загрузить данные, попробуйте" } });
        }

    };
    return (
        <>
            <Header />
            <div className="search-page__wrapper">
                <div className="search-page">
                    <div className="search-page__content">
                        <div className="search-page__header">
                            <div className="">
                                <h1 className="search-page__content-title">Найдите необходимые данные в пару кликов.</h1>
                                <p className="search-page__content-description">Задайте параметры поиска.<br></br> Чем больше заполните, тем точнее поиск</p>
                            </div>
                            <div className="search-page__logo">
                                <img src={require("../img/Document.svg").default} className="search-page__logo-doc" alt="document"></img>
                                <img src={require("../img/Folders.svg").default} className="search-page__logo-folders" alt="folders"></img>
                            </div>
                        </div>
                        <div className="search-page__form-wrapper">
                            <form onSubmit={handleSubmit} className="search-page__form">
                                <div className="search-page__form-fields">
                                    <div className="field inn">
                                        <label>ИНН компании</label>
                                        <input onChange={handleChange} value={searchParams.inn} name="inn" placeholder="10 цифр"></input>
                                    </div>
                                    {formErrors.inn && <div className="inn_error-message">{formErrors.inn}</div>}
                                    <div className="field tonality">
                                        <label>Тональность</label>
                                        <select name="tonality" value={searchParams.tonality} onChange={handleChange}>
                                            <option value="any">Любая</option>
                                            <option value="positive">Положительная</option>
                                            <option value="negative">Отрицательная</option>
                                        </select>
                                    </div>
                                    <div className="field value">
                                        <label>Количество документов в выдаче</label>
                                        <input value={searchParams.value} onChange={handleChange} name="value" placeholder="От 1 до 1000"></input>
                                        {formErrors.value ? <p className="diapason__date-error">{formErrors.value}</p> : <></>}
                                    </div>
                                    <div className="field diapason">
                                        <label>Диапазон поиска</label>
                                        <div className="diapason__date">
                                            <div className="diapason__date-from">
                                                <input
                                                    onChange={handleChange}
                                                    name="fromDate"
                                                    value={searchParams.fromDate}
                                                    type="date"
                                                    placeholder="Дата начала"
                                                />
                                            </div>
                                            <div className="diapason__date-to">
                                                <input
                                                    name="toDate"
                                                    value={searchParams.toDate}
                                                    onChange={handleChange}
                                                    type="date"
                                                    placeholder="Дата конца"
                                                />
                                            </div>
                                        </div>
                                        {formErrors.errorDate ? <p className="diapason__date-error">{formErrors.errorDate}</p> : <></>}
                                    </div>
                                    <div className="form-list__submit-mobile">
                                        <button disabled={!isFormValid} onClick={handleSearch} className={isFormValid ? "search-page__form-submit" : "search-page__form-submit-invalid"}><p>Поиск</p></button>
                                        <p className="search-page__form-warn">* Обязательные к заполнению поля</p>
                                    </div>
                                </div>
                                <div className="search-page__form-list">
                                    <div className="form-list">
                                        <div className="form-list__point">
                                            <input name="completeness" onChange={handleChange} checked={searchParams.completeness} type='checkbox'></input>
                                            <label>Признак максимальной полноты</label>
                                        </div>
                                        <div className="form-list__point">
                                            <input name="businessContext" onChange={handleChange} checked={searchParams.businessContext} type='checkbox'></input>
                                            <label>Упоминания в бизнес-контексте</label>
                                        </div>
                                        <div className="form-list__point">
                                            <input name="mainRole" onChange={handleChange} checked={searchParams.mainRole} type='checkbox'></input>
                                            <label>Главная роль в публикации</label>
                                        </div>
                                        <div className="form-list__point">
                                            <input name="riskFactor" onChange={handleChange} checked={searchParams.riskFactor} type='checkbox'></input>
                                            <label>Публикации только с риск-факторами</label>
                                        </div>
                                        <div className="form-list__point">
                                            <input onChange={handleChange} checked={searchParams.technicalNews} name="technicalNews" type='checkbox'></input>
                                            <label>Включать технические новости рынков</label>
                                        </div>
                                        <div className="form-list__point">
                                            <input onChange={handleChange} checked={searchParams.announcements} name="announcements" type='checkbox'></input>
                                            <label>Включать анонсы и календари</label>
                                        </div>
                                        <div className="form-list__point">
                                            <input onChange={handleChange} checked={searchParams.newsDigest} name="newsDigest" type='checkbox'></input>
                                            <label>Включать сводки новостей</label>
                                        </div>
                                    </div>
                                    <div className="form-list__submit">
                                        <button disabled={!isFormValid} onClick={handleSearch} className={isFormValid ? "search-page__form-submit" : "search-page__form-submit-invalid"}><p>Поиск</p></button>
                                        <p className="search-page__form-warn">* Обязательные к заполнению поля</p>
                                    </div>
                                </div>
                            </form>
                            <div className="search-form__decorate">
                                <img src={require("../img/rocket.jpg")} className="search-form__decorate-img" alt="rocket"></img>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <Footer />
        </>
    )
}
export default SearchData
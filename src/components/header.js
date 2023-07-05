import { Link } from 'react-router-dom';
import { HandleEntailmentRequest } from '../pages/preventDefault/preventDefault';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Header() {
    const [userInfo, setUserInfo] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    }

    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, []);


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const getUserInfo = () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        fetch('https://gateway.scan-interfax.ru/api/v1/account/info', { headers })
            .then(response => response.json())
            .then(data => {
                if (data.eventFiltersInfo) {
                    setUserInfo(data.eventFiltersInfo);
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <>
            <header className="header">
                <div className="header__logo">
                    <Link to="/">
                        <img src={require("../img/SGN_09_24_2022_1663968217400 1.svg").default} alt="logo"></img>
                    </Link>
                </div>
                <div className={token ? 'header__content' : "header__content-unauthorized"} >
                    <nav className="header__nav">
                        <a onClick={(e) => HandleEntailmentRequest(e)} className="nav-link" href='/#'>Главная</a>
                        <a onClick={(e) => HandleEntailmentRequest(e)} className="nav-link" href='/#'>Тарифы</a>
                        <a onClick={(e) => HandleEntailmentRequest(e)} className="nav-link" href='/#'>FAQ</a>
                    </nav>
                    {token && (
                        userInfo ?
                            <div className="header__company-info">
                                <div className='header__company-info-used'>
                                    <p className='company-info__used-title'>Использовано компаний</p>
                                    <p className='company-info__used'>{userInfo.usedCompanyCount}</p>
                                </div>
                                <div className='header__company-info-limit'>
                                    <p className='company-info__limit-title'>Лимит по компаниям </p>
                                    <p className='company-info__limit' >{userInfo.companyLimit}</p>
                                </div>
                            </div> :
                            <div className="header__company-info">
                                <img className='header__company-info-spinner' src={require("../img/spinner.svg").default} alt='loading'></img>
                            </div>
                    )}
                    {!token && (
                        <>
                            <div className="header__hidden-info"></div>
                            <div className="header__registration">
                                <button className="header__registration-signup">
                                    <p>Зарегистрироваться</p>
                                </button>
                                <div className="isolation-line"></div>
                                <Link to="/login">
                                    <button className="header__registration-login">
                                        <p>Войти</p>
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                    {token && (
                        <div className='header__logout-wrapper'>
                            <Link className="header__logout" onClick={handleLogout} to="/login">
                                <button className="header__logout-button">
                                    <p className="header__logout-name">Алексей А.</p>
                                    <p className="header__logout-out">Выйти</p>
                                </button>
                                <img src={require("../img/avatar.svg").default} alt='avatar'></img>
                            </Link>
                        </div>
                    )}
                </div>
                <button className='header__burger' onClick={handleMenuClick}>
                    <img src={require("../img/burger.svg").default}></img>
                </button>
                {showMenu &&
                    <div className='header__burger-content'>
                        <div className='burger-content__head'>
                            <img src={require("../img/burger-logo.svg").default}></img>
                            <button onClick={handleMenuClick} className='burger-content__head-btn'>
                                <img src={require("../img/close.svg").default}></img>
                            </button>
                        </div>
                        <nav className="header__nav-burger">
                            <a onClick={(e) => HandleEntailmentRequest(e)} className="nav-link" href='/#'>Главная</a>
                            <a onClick={(e) => HandleEntailmentRequest(e)} className="nav-link" href='/#'>Тарифы</a>
                            <a onClick={(e) => HandleEntailmentRequest(e)} className="nav-link" href='/#'>FAQ</a>
                        </nav>
                        {!token && (
                            <>
                                <div className="burger-content__registration">
                                    <button className="header__registration-signup">
                                        <p>Зарегистрироваться</p>
                                    </button>
                                    <Link to="/login">
                                        <button className="header__registration-login">
                                            <p>Войти</p>
                                        </button>
                                    </Link>
                                </div>
                            </>
                        )}
                        {token &&
                            (
                                <>
                                    <div className="burger-content__registration">
                                        <button className="header__registration-signup">
                                            <p>Личный кабинет</p>
                                        </button>
                                        <Link className="header__logout" onClick={handleLogout} to="/login">
                                            <button className="header__registration-login">
                                                <p>Выйти</p>
                                            </button>
                                        </Link>
                                    </div>
                                </>

                            )

                        }
                    </div>
                }
            </header>
        </>
    )
}
export default Header


import { HandleEntailmentRequest } from "../../pages/preventDefault/preventDefault";
import { useState } from "react";
import SubmitAuth from "./submitAuth";
function LoginForm() {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [isError, setIsError] = useState(false); // добавляем переменную для отслеживания ошибки
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(credentials),

        });
      const data = await response.json();
      if (response.ok) {
        setIsError(false); // возвращаем только токен 
        return data.accessToken;
      } else {
        setIsError(true); // возвращаем null в случае ошибки 
        setErrorMessage(data.message);
      }
    } catch (error) { setIsError(true); console.error(error); return null; }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className='authorization__form'>
      <div className='authorization__form-buttons'>
        <button onClick={(e) => HandleEntailmentRequest(e)} className='authorization__login'>
          <p>Войти</p>
        </button>
        <button onClick={(e) => HandleEntailmentRequest(e)} className='authorization__signup'>
          <p>Зарегистрироваться</p>
        </button>
      </div>
      <div className='authorization__form-data'>
        <div className="authorization__form-login">
          <label htmlFor="login" className="label">Логин или номер телефона:</label>
          <input className='login' type="text" value={credentials.login} onChange={e => setCredentials({ ...credentials, login: e.target.value })} />
          {isError && <div className="error-message">{"Введите корректные данные"}</div>}
        </div>
        <div className="authorization__form-password">
          <label className="password">Пароль:</label>
          <input className='pass' type="password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
          {isError && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
      <SubmitAuth handleSubmit={handleSubmit} isAuthorized={!isError} />
      <a href="/*" className='authorization__form-restore'>Восстановить пароль</a>
      <div className='authorization__form-alternative'>
        <p className='alternative-title'>Войти через:</p>
        <div className='buttons-container'>
          <button>
            <img src={require("../../img/google.svg").default} alt="google"></img>
          </button>
          <button>
            <img src={require("../../img/facebook.svg").default} alt="facebook"></img>
          </button>
          <button>
            <img src={require("../../img/ya.svg").default} alt="yandex"></img>
          </button>
        </div>
      </div>
    </form>

  );
}

export default LoginForm;
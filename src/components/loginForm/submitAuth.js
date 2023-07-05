import { useNavigate } from 'react-router-dom';

function SubmitAuth({ handleSubmit }) {
  const navigate = useNavigate();
  
  async function handleClick() {
    try {
      const token = await handleSubmit();
      const Authorized = JSON.parse(localStorage.getItem('token'));

      if (token) {
        localStorage.setItem('token', token);
        navigate ('/', { state: { token }})
      }
  
    } catch (error) {
      console.error('Ошибка запроса:', error.message);
      alert('Ошибка запроса: ' + error.message);
    }
  }
  
  return (
    <button type='button' onClick={handleClick} className='authorization__form-submit'>
      <p>Войти</p>
    </button>
  );
}

export default SubmitAuth;
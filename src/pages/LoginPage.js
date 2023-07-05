import '../css/style.css';
import Header from '../components/header';
import Footer from '../components/footer';
import LoginForm from '../components/loginForm/loginForm';

function LoginPage() {
    return (
        <>
            <main>
                <Header />
                <section className='authorization'>
                    <div className='authorization__warning'>
                        <p className='authorization__message'>Для оформления подписки на тариф, необходимо авторизоваться.</p>
                        <img src={require("../img/Characters.jpg")} className='authorization__logo' alt='logo'></img>
                    </div>
                    <div className='authorization__form-wrapper'>
                        <img src={require("../img/padlock.jpg")} className='lock-logo' alt='lock'></img>
                        <LoginForm />
                    </div>
                    <img src={require("../img/Characters.svg").default} className='authorization__logo-mobile' alt='logo'></img>

                </section>
                <Footer />
            </main>
        </>
    )
}

export default LoginPage

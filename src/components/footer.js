function Footer() {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <img className="footer__logo" src={require("../img/footer-logo.svg").default} alt="footer logo"></img>
                <img className="footer__logo-mobile" src={require("../img/footer-logo mobile.svg").default} alt="footer logo"></img>
                <div className="footer__description">
                    <p className="footer__contacts">г. Москва, Цветной б-р, 40 +7 495 771 21 11 info@skan.ru</p>
                    <p>Copyright. 2022</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTelegram, faWhatsapp, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';

import Navigation from '../organisms/Navigation';

import './contacts.scss';

const Contacts = () => {
    return (
        <>
            <Navigation />
            <div className="container-contacts">
                <span>Контакти</span>
                <span>Для того, щоб зв'язатись з нами і отримати відповідь на питання, яке вас турбує - скористуйтесь контактами нижче!</span>
                <div className="contacts-feedback">
                    <a href="mailto:svyatnenkoval@gmail.com">Електронна скринька: svyatnenkoval@gmail.com</a>
                    <a href="tel:380637446175">Телефон підтримки: +38(063)744 61-75</a>
                </div>
                <div className="contacts-social">
                    <span>Наші соціальні мережі</span>
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTelegram} />
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <FontAwesomeIcon icon={faYoutube} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faDiscord} /> 
                </div>
                <span>Адреса магазину: вул. Перемоги 39, Запоріжжя, Запорізька область</span>
                <iframe title='map-shop' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2053.3525604135493!2d35.10951499934649!3d47.84718342906177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc672ab0c15283%3A0xa1f680cae97fe320!2z0YPQuy4g0J_QvtCx0LXQtNGLLCAzOSwg0JfQsNC_0L7RgNC-0LbRjNC1LCDQl9Cw0L_QvtGA0L7QttGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2OTAwMA!5e0!3m2!1sru!2sua!4v1680981830738!5m2!1sru!2sua" width="600" height="450" loading="lazy"></iframe>
            </div>
        </>
    );
}

export default Contacts;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTelegram, faWhatsapp, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';

import Navigation from '../organisms/Navigation';

import './contacts.scss';

const Contacts = () => {
    return (
        <>
            <Navigation />
            <div className="container-contacts">
                <p>Контакты</p>
                <p>Если у вас возникли какие-то вопросы или претензии вы можете связаться с нами!</p>
                <div className="contacts-feedback">
                    <a href="mailto:volkovostap12@gmail.com">Почта: volkovostap12@gmail.com</a>
                    <a href="tel:75554443333">Телефон поддержки: 7-555-444-33-33</a>
                </div>
                <div className="contacts-social">
                    <p>Наши социальные сети</p>
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTelegram} />
                    <FontAwesomeIcon icon={faWhatsapp} />
                    <FontAwesomeIcon icon={faYoutube} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faDiscord} />
                </div>
                <p>Адресс магазина: <br /><span>ул. 8 Марта, 46, Екатеринбург, Свердловская обл., Россия, 620014</span></p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28430.41310464264!2d60.63592069663203!3d56.81395012066253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c16ef278826bc7%3A0xc81b0908919e1ad0!2z0KLQoNCmIMKr0JPRgNC40L3QstC40YfCuw!5e0!3m2!1sru!2sua!4v1653222964559!5m2!1sru!2sua" allowFullScreen loading="lazy" referrerPolicy="true"></iframe>
            </div>
        </>
    );
}

export default Contacts;
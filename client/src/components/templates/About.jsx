import Navigation from '../organisms/Navigation';

import './about.scss';

const About = () => {
    return (
        <>
            <Navigation />
            <div className="container-aboutus">
                <p>Немного о Mirta</p>
                <p>Мы интернет-магазин Mirta, наша команда состоит из молодого коллектива, который работает во благо вас! Наша цель предоставить вам качественный товар по низкой цене, без какой-либо наценки.</p>
            </div>
        </>
    );
}

export default About;
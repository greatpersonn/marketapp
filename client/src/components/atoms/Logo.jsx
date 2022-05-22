import { NavLink } from 'react-router-dom';

import './logo.scss';

const Logo = () => {
    return (
        <div className="title-logo">
            <NavLink to='/'><img src={require('../../assets/images/store.png')} alt="storeIcon" />Mirta Market</NavLink>
        </div>
    );
}

export default Logo;
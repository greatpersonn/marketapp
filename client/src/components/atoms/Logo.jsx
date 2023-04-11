import { NavLink } from 'react-router-dom';

import './logo.scss';

const Logo = () => {
    return (
        <div className="title-logo">
            <NavLink to='/'>
                <img src={require('../../assets/images/store.png')} alt="storeIcon" />
                <span>aquapeak</span>
            </NavLink>
        </div>
    );
}

export default Logo;
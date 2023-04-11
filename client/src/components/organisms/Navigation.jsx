import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './navigation.scss';

const Navigation = () => {
    const { statusLogin } = useContext(AuthContext);

    return ( 
        <div className="title-navigation">
            <NavLink to='/about'>Про нас</NavLink>
            <NavLink to='/news'>Новини</NavLink>
            <NavLink to='/'>Каталог</NavLink>
            <NavLink to='/feedbacks'>Відгуки</NavLink>
            <NavLink to='/contacts'>Контакти</NavLink>
            {
                statusLogin ? <NavLink to="/profile">Особистий кабінет</NavLink> : <NavLink to="/sign-in">Ввійти в кабінет</NavLink>
            }
        </div>
    );
}

export default Navigation;
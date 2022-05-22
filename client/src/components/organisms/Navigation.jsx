import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './navigation.scss';

const Navigation = () => {
    const { statusLogin } = useContext(AuthContext);

    return ( 
        <div className="title-navigation">
            <NavLink to='/about'>О нас</NavLink>
            <NavLink to='/news'>Новости</NavLink>
            <NavLink to='/'>Товары</NavLink>
            <NavLink to='/feedback'>Отзывы</NavLink>
            <NavLink to='/contacts'>Контакты</NavLink>
            {
                statusLogin ? <NavLink to="/profile">Личный кабинет</NavLink> : <NavLink to="/sign-in">Войти</NavLink>
            }
        </div>
    );
}

export default Navigation;
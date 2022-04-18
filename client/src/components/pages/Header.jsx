import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Context
import { AuthContext } from "../../context/auth-context";
import { ThemeContext } from "../../context/theme-context";
import Switch from "../atoms/Switch";

// Styles
import './header.scss';

const Header = () => {
    const { switchTheme } = useContext(ThemeContext);
    const { statusLogin, setStatus } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.setItem('status_login', false);
        localStorage.removeItem('user');
        setStatus(prev => !prev);
    }

    useEffect(() => {

        if (JSON.parse(localStorage.getItem('theme')) !== switchTheme) {
            localStorage.setItem('theme', JSON.stringify(switchTheme));
        }

        if(JSON.parse(localStorage.getItem('status_login')) !== statusLogin) {
            localStorage.setItem('status_login', JSON.stringify(statusLogin));
        }

    }, [switchTheme, statusLogin]);

    return(
        <header>
            <div className="header__container">
                <div className="container-headweb">
                    Добро пожаловать
                </div>
                <div className="container-option">
                    <Switch />
                    {
                        switchTheme ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>
                    }
                </div>
                <div className="container-authorization">
                    {
                        statusLogin ? <NavLink to="/" onClick={() => { handleLogout(); }}>Выйти</NavLink> : <NavLink to="/sign-in">Войти</NavLink>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
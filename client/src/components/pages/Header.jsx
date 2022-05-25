import React, { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';

// Context
import { ThemeContext } from "../../context/theme-context";
import Switch from "../atoms/Switch";

// Styles
import './header.scss';

const Header = () => {
    const { switchTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('theme')) !== switchTheme) {
            localStorage.setItem('theme', JSON.stringify(switchTheme));
        }
    }, [switchTheme]);

    return(
        <header>
            <div className="header__container">
                <div className="container-headweb">
                    <NavLink to='/'>MIRTA</NavLink>
                </div>
                <div className="container-option">
                    <Switch />
                    {
                        switchTheme ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
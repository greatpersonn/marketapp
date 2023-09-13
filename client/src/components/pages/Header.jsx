import React from "react";
import { NavLink } from 'react-router-dom';

// Styles
import './header.scss';

const Header = () => {
    return(
        <header>
            <div className="header__container">
                <div className="container-headweb">
                    <NavLink to='/'>aquapeak</NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;
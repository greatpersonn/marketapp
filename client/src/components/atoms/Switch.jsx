import React, { useContext } from "react";

import { ThemeContext } from "../../context/theme-context";

import './switch.scss';

const Switch = () => {
    const { setSwitchTheme } = useContext(ThemeContext);
    
    const handleSwitchTheme = () => {
        setSwitchTheme(prev => !prev);
    }

    return (
        <label className="switch">
            <input type="checkbox" onChange={handleSwitchTheme} defaultChecked={JSON.parse(localStorage.getItem('theme') || 'false')} />
            <span className="slider round"></span>
        </label>
    );
}

export default Switch;
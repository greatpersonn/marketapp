import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
    const [switchTheme, setSwitchTheme] = useState(JSON.parse(localStorage.getItem('theme')));

    return(
        <ThemeContext.Provider value={{switchTheme, setSwitchTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
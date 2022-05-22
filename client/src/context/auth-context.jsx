import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [statusLogin, setStatus] = useState(JSON.parse(localStorage.getItem('status_login')));

    if(JSON.parse(localStorage.getItem('status_login')) === undefined) {
        localStorage.setItem('status_login', false);        
        setStatus(false);
    }

    return(
        <AuthContext.Provider value={{statusLogin, setStatus}}>
            {props.children}
        </AuthContext.Provider>
    )
}
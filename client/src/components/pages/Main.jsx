import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Title from "../organisms/Title";
import SingIn from "../templates/Signin"; 
import SignUp from "../templates/Singup";
import Profile from "../templates/Profile";
import Products from "../templates/Products";
import Users from "../templates/Users";
import Shopcart from "../templates/Shopcart";
import News from "../templates/News";
import About from "../templates/About";
import Contacts from "../templates/Contacts";

import { ThemeContext } from "../../context/theme-context";

import './main.scss';

const Main = () => {
    const { switchTheme } = useContext(ThemeContext);

    return (
        <main className={switchTheme ? 'darkthemes' : ''}>
            <div className="main__container">
                <Routes>
                    <Route path="/" element={<><Title /><Products /></>} />
                    <Route path="/sign-in" element={<SingIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/shop-cart" element={<Shopcart />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </div>
        </main>
    );
}

export default Main;
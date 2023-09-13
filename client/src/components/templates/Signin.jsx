import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';

import Input from "../atoms/Input";
import Button from "../atoms/Button";

import useInput from '../../hooks/useInput';
import { AuthContext } from "../../context/auth-context";

import './sign-form.scss';

const SingIn = () => {

    let navigate = useNavigate();
    const { setStatus } = useContext(AuthContext);

    const _useremail = useInput('', true);
    const _userpass = useInput('', true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(!_useremail.value || !_userpass.value) {
                return alert('Поля не могут быть пустыми!');
            } else {
                const data = { 'Useremail': _useremail.value, 'Userpassword': _userpass.value };
                const response = await fetch('http://localhost:5000/user-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const jsonData = await response.json();

                if(!jsonData.error) {
                    localStorage.setItem('user', JSON.stringify(jsonData.user));
                    localStorage.setItem('status_login', JSON.stringify(true));
                    setStatus(prev => !prev);
                    setTimeout(() => {
                        return navigate('/profile', { replace: true });
                    }, 1500);
                }
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container-signin">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="signin-headtext">Авторизація</div>
                <div className="wrap_input">
                    <Input type='email' holderTitle='Введіть вашу пошту...' inputObject={_useremail} inputId='useremail' />
                    <AlternateEmailIcon />
                </div>
                <div className="wrap_input">
                    <Input type='password' holderTitle='Введіть ваш пароль...' inputObject={_userpass} inputId='userpass' />
                    <KeyIcon />
                </div>
                <Button name='Поринути в море' func={() => { console.log('Авторизация пользователя'); }} />
                <NavLink to='/sign-up'>Стати рибкою?</NavLink>
            </form>
        </div>
    );
}

export default SingIn;
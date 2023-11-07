import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import PasswordIcon from '@mui/icons-material/Password';

import Input from "../atoms/Input";
import Button from "../atoms/Button";

import useInput from '../../hooks/useInput';
import { AuthContext } from "../../context/auth-context";

import './sign-form.scss';

const SignUp = () => {

    let navigate = useNavigate();
    const { setStatus } = useContext(AuthContext);

    const _username = useInput('', true);
    const _useremail = useInput('', true);
    const _userpass = useInput('', true);
    const _confpass = useInput('', true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(!_username.value || !_useremail.value || !_userpass.value || !_confpass.value) {
                return alert('Поля не могут быть пустыми!');
            } else {
                if(_username.value.length < 5) {
                    return alert('Имя пользователя должно состоять минимум из 5-ти символов!');
                }

                if(_userpass.value.length < 8) {
                    return alert('Пароль должен содержать минимум 8 символов!');
                }

                if(_userpass.value !== _confpass.value) {
                    return alert('Пароли не совпадают!');
                }

                const data = { 'Username': _username.value, 'Useremail': _useremail.value, 'Userpassword': _userpass.value, 'Userrole': 'User' };
                const response = await fetch('http://localhost:5000/user-register', {
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
        <div className="container-signup">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="signin-headtext">Реєстрація</div>
                <div className="wrap_input">
                    <Input type='text' nameInput='Логін' holderTitle='Введіть ваш логін...' inputObject={_username} inputId='username' />
                    <PersonIcon />
                </div>
                <div className="wrap_input">
                    <Input type='email' nameInput='Електронна пошта' holderTitle='Введіть вашу пошту...' inputObject={_useremail} inputId='useremail' />
                    <AlternateEmailIcon />
                </div>
                <div className="wrap_input">
                    <Input type='password' nameInput='Пароль' holderTitle='Введіть ваш пароль...' inputObject={_userpass} inputId='userpass' />
                    <KeyIcon />
                </div>
                <div className="wrap_input">
                    <Input type='password' nameInput='Підтвердити пароль' holderTitle='Повторно введіть пароль...' inputObject={_confpass} inputId='confpass' />
                    <PasswordIcon />
                </div>
                <Button name='Створити акаунт' func={() => { console.log('Регистация пользователя'); }} />
                <NavLink to='/sign-in'>Вже плаваєте у нас?</NavLink>
            </form>
        </div>
    );
}

export default SignUp;
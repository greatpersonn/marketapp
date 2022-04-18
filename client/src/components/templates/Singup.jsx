import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";

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
                <div className="signin-headtext">Регистрация</div>
                <Input type='text' nameInput='Логин' holderTitle='Введите ваш логин' inputObject={_username} inputId='username' />
                <Input type='email' nameInput='Почта' holderTitle='Введите вашу почту' inputObject={_useremail} inputId='useremail' />
                <Input type='password' nameInput='Пароль' holderTitle='Введите ваш пароль' inputObject={_userpass} inputId='userpass' />
                <Input type='password' nameInput='Подтвердите пароль' holderTitle='Повторите пароль' inputObject={_confpass} inputId='confpass' />
                <Button name='Создать аккаунт' func={() => { console.log('Регистация пользователя'); }} />
                <NavLink to='/sign-in'>Уже есть аккаунт?</NavLink>
            </form>
        </div>
    );
}

export default SignUp;
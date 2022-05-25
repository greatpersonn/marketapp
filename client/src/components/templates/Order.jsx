import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';

import Button from "../atoms/Button";
import Input from '../atoms/Input';

import { ModalContext } from '../../context/modal-context';

import useInput from '../../hooks/useInput';

import './modal.scss';

const Order = ({ products }) => {
    let navigate = useNavigate();

    const { setOrderModal } = useContext(ModalContext);
    const [isOrder, setOrder] = useState('house');

    const _houseaddrres = useInput('', true);
    const _postaddress = useInput('', true);
    const _phonenumber = useInput('', true);

    const date = new Date();

    const createOrder = async (e) => {
        try {
            e.preventDefault();
            const user = JSON.parse(localStorage.getItem('user'));
            const data = { 'UserId': user._id, 'Products': products, 'PhoneNumber': _phonenumber.value, 'OrderNum': user._id.length + (Math.floor(Math.random() * 10000)), 'OrderDate': `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}` };

            const params = {
                from_name: "MIRTA MARKET",
                name: user.username,
                email: user.useremail,
                ordernum: user._id.length + (Math.floor(Math.random() * 10000)),
                orderstatus: 'Обработка',
                orderdate: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            }

            const response = await fetch('http://localhost:5000/create-user-orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const jsonData = await response.json();

            if (jsonData.message) {
                emailjs.send("service_kwflk26", "template_xzefzyp", params, 'sJewkiIckH64h4T-y');
                setTimeout(() => {
                    setOrderModal(prev => !prev);
                    navigate('/profile', { replace: true });
                }, 2000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={createOrder} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info order">
                    <p>Оформление заказа</p>
                    <div className="container-list">
                        <label htmlFor="get-order">Пункт выдачи</label>
                        <select value={isOrder} name="get-order" id="get-order" onChange={(e) => { setOrder(e.target.value) }}>
                            <option value="store">Забрать в магазине</option>
                            <option value="post-office">Забрать на почте</option>
                            <option value="house">Доставка на дом</option>
                        </select>
                    </div>
                    {
                        isOrder === 'house' && <Input type='text' nameInput='Введите адресс' inputId='homeAddress' holderTitle="Введите адресс доставки заказа" inputObject={_houseaddrres} />
                    }
                    {
                        isOrder === 'post-office' && <Input type='text' nameInput='Введите отделение' inputId='postAddress' holderTitle="Введите отделение почты" inputObject={_postaddress} />
                    }
                    <Input type='text' nameInput='Номер телефона' inputId='phoneNumber' holderTitle="Введите номер телефона" inputObject={_phonenumber} />
                    <div className="container-buttons">
                        <Button name="Заказать" func={() => { console.log('Create product'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setOrderModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Order;
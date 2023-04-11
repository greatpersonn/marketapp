import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
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
    
    const [isList, setList] = useState(false);
    const [isValue, setValue] = useState('Замовити доставку')

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
                from_name: "aquapeak",
                name: user.username,
                email: user.useremail,
                ordernum: user._id.length + (Math.floor(Math.random() * 10000)),
                orderstatus: 'В обробці',
                orderdate: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            }

            const response = await fetch('http://localhost:5000/create-user-orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const jsonData = await response.json();

            if (jsonData.message) {
                emailjs.send("service_3t429qi", "template_xzefzyp", params, 'sJewkiIckH64h4T-y');
                setTimeout(() => {
                    setOrderModal(prev => !prev);
                    navigate('/profile', { replace: true });
                }, 2000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleList = (e, data) => {
        setValue(e.target.innerText);
        setOrder(data);
        setList(prev => !prev);
    }

    return (
        <form onSubmit={createOrder} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info order">
                    <p>Створення замовлення</p>
                    <div className="container-list">
                        <label htmlFor="get-order">Спосіб доставки</label>
                        <div className='dropdown-list'>
                            <div className="list-header" onClick={() => { setList(prev => !prev) }}>
                                <span>{ isValue }</span>
                                <FontAwesomeIcon icon={faCaretDown} className={`${isList && 'open-list'}`} />
                            </div>
                            { isList && 
                            <div className="list">
                                <li onClick={(e) => handleList(e, 'store')}>Забрати в магазині</li>
                                <li onClick={(e) => handleList(e, 'post-office')}>Забрати на пошті</li>
                                <li onClick={(e) => handleList(e, 'house')}>Замовити доставку</li>
                            </div>
                            }
                        </div>
                    </div>
                    {
                        isOrder === 'house' && <Input type='text' nameInput='Введіть адресу будинку' inputId='homeAddress' holderTitle="Введіть адресу доставки замовлення..." inputObject={_houseaddrres} />
                    }
                    {
                        isOrder === 'post-office' && <Input type='text' nameInput='Введіть відділення пошти' inputId='postAddress' holderTitle="Введіть відділення пошти..." inputObject={_postaddress} />
                    }
                    <Input type='text' nameInput='Номер телефону' inputId='phoneNumber' holderTitle="Введіть номер телефону..." inputObject={_phonenumber} />
                    <div className="container-buttons">
                        <Button name="Замовити" func={() => { console.log('Create product'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setOrderModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Order;
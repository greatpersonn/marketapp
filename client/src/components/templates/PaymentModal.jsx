import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from "../atoms/Button";
import Input from '../atoms/Input';
import Loader from "../atoms/Loader";

import useInput from '../../hooks/useInput';

import './modal.scss';

const PaymentModal = (props) => {
    let navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const _cardnum = useInput('', true);
    const _cardname = useInput('', true);
    const _expdate = useInput('', true);
    const _seccode = useInput('', true);

    const createPayment = async (e) => {
        try {
            e.preventDefault();
            const user = JSON.parse(localStorage.getItem('user'));
            const data = { 'UserId': user._id, 'Order': props.order };

            const response = await fetch('http://localhost:5000/pay-for-order', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            setLoading(prev => !prev);

            const jsonData = await response.json();
            if (jsonData.message) {
                setTimeout(() => {
                    setLoading(prev => !prev);
                    navigate('/', { replace: true }); 
                }, 2000);
            }


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={createPayment} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info payment">
                    {
                        isLoading ? <Loader /> :
                            <>
                                <Input type='text' nameInput='Ім`я та прізвище' inputId='infoCLient' holderTitle="Введіть ім`я та прізвище..." inputObject={_cardname} />
                                <Input type='text' nameInput='Номер картки' inputId='cardNum' holderTitle="XXXX XXXX XXXX XXXX" inputObject={_cardnum} />
                                <div className="container-inputs">
                                    <Input type='text' nameInput='Термін картки' inputId='expDate' holderTitle="MM / YYYY" inputObject={_expdate} />
                                    <Input type='password' nameInput='Секретний код' inputId='secretCode' holderTitle="XXX" inputObject={_seccode} />
                                </div>
                                <div className="container-buttons">
                                    <Button name="Сплатити" func={() => { console.log('Create product'); }} />
                                </div>
                            </>
                    }
                </div>
            </div>
        </form>
    );
}
export default PaymentModal;
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Button from "../atoms/Button";
import Input from '../atoms/Input';

import { ModalContext } from '../../context/modal-context';

import useInput from '../../hooks/useInput';

import './modal.scss';

const ProfileModal = () => {
    let navigate = useNavigate();
    const { setProfileModal } = useContext(ModalContext);

    const _name = useInput('', true);
    const _surname = useInput('', true);
    const _city = useInput('', true);
    const _postalcode = useInput('', true);
    const _phonenumber = useInput('', true);

    const createProfileInfo = async (e) => {
        try {
            e.preventDefault();
            const user = JSON.parse(localStorage.getItem('user'));
            const data = { 'UserId': user._id, 'Username': _name.value, 'Usersurname': _surname.value, 'Usercity': _city.value, 'Userpostalcode': _postalcode.value, 'Userphonenumber': _phonenumber.value };

            const response = await fetch('http://localhost:5000/update-user-info', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const jsonData = await response.json();
            if (jsonData.message) {
                setTimeout(() => {
                    setProfileModal(prev => !prev);
                    navigate('/', { replace: true });
                }, 1500);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={createProfileInfo} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info profile">
                    <Input type='text' nameInput='Ім`я' inputId='nameUser' holderTitle="Введіть своє ім`я..." inputObject={_name} />
                    <Input type='text' nameInput='Прізвище' inputId='surnameUser' holderTitle="Введіть своє прізвище..." inputObject={_surname} />
                    <Input type='text' nameInput='Місто' inputId='cityUser' holderTitle="Введіть своє місто..." inputObject={_city} />
                    <Input type='text' nameInput='Поштовий індекс' inputId='postalcodeUser' holderTitle="Введіть поштовий індекс..." inputObject={_postalcode} />
                    <Input type='text' nameInput='Номер телефону' inputId='phoneUser' holderTitle="Введіть номер телефону..." inputObject={_phonenumber} />
                    <div className="container-buttons">
                        <Button name="Зберегти" func={() => { console.log('Create product'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setProfileModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ProfileModal;
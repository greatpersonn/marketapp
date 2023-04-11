import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Button from "../atoms/Button";
import Input from "../atoms/Input";

import { ModalContext } from '../../context/modal-context';

import useInput from '../../hooks/useInput';

import './modal.scss';

const Edit = () => {
    const { setEditModal } = useContext(ModalContext);

    const _editname = useInput('', true);
    const _editemail = useInput('', true);
    const _editrole = useInput('', true);

    const editUser = async (e) => {
        try {
            const data = { 'Editname': _editname.value, 'Editemail': _editemail.value, 'Editrole': _editrole.value, 'Editeduser': JSON.parse(localStorage.getItem('editeduser'))};
            localStorage.removeItem('editeduser');

            await fetch('http://localhost:5000/edit-user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={editUser} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info edit" >
                    <Input type='text' nameInput='Новий логін' inputId='productName' holderTitle="Введіть новий логін..." inputObject={_editname} />
                    <Input type='text' nameInput='Нова електронна пошта' inputId='productKey' holderTitle="Введіть нову пошту..." inputObject={_editemail} />
                    <Input type='text' nameInput='Змінити роль' inputId='productPrice' holderTitle="Введіть нову роль..." inputObject={_editrole} />
                    <div className="container-buttons">
                        <Button name="Редагування" func={() => { console.log('Edit user'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setEditModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Edit;
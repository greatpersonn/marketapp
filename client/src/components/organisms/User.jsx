import { useState } from "react";
import { useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Modal from "../molecules/Modal";

import './user.scss';

const User = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSetEdit = () => {
        localStorage.setItem('editeduser', JSON.stringify(props.cardData));
        props.modalAction(true);
    }

    const handleDelete = async () => {
        const response = await fetch('http://localhost:5000/delete-user', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.cardData)
        })

        const jsonData = await response.json();
        if(jsonData.message) {
            setModalActive(prev => !prev);
            setModalMessage(jsonData.message);
            props.action();
        }
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="container-user">
                <PersonIcon />
                <span>{props.cardData.username}</span>
                <span>{props.cardData.useremail}</span>
                <span>{props.cardData.userrole}</span>
                <div className="container-tools">
                    <EditIcon className='tool edit' onClick={() => { handleSetEdit(); }} />
                    <DeleteIcon className='tool delete' onClick={() => { handleDelete(); }} />
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive} header={'Видалення користувача'}>
                <span>{modalMessage}</span>
            </Modal>
        </>
    );
}

export default User;
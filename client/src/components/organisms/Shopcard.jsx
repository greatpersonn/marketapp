import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import Modal from '../molecules/Modal';

import './shopcard.scss';

const Shopcard = ({ prod, action }) => {

    const [modalActive, setModalActive] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleDelte = async () => {
        const data = { 'Product': prod, 'Userdata': JSON.parse(localStorage.getItem('user')) };

        const response = await fetch('http://localhost:5000/delete-user-product', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const jsonData = await response.json();

        if (jsonData.message) {
            setModalMessage(jsonData.message);
            setModalActive(prev => !prev);
            action();
        }

    }

    return (
        <>
            <div className="shopcart-card">
                <img src={require(`../../../public/products/${prod.productimage}`)} alt="prodImage" />
                <div className="card-info">
                    <p>{prod.productname}</p>
                    <p>{prod.productdesc}</p>
                </div>
                <div className="card-price">
                    <p>{prod.productprice} грн</p>
                </div>
                <div className="card-tools">
                    <DeleteIcon className='tool-delete' onClick={() => { handleDelte(); }} />
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive} header={'Видалення товару'}>
                <span>{modalMessage}</span>
            </Modal>
        </>
    )
}

export default Shopcard;
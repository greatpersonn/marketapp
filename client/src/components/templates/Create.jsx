import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Button from "../atoms/Button";
import Input from "../atoms/Input";

import { ModalContext } from '../../context/modal-context';

import useInput from '../../hooks/useInput';

import './modal.scss';

const Create = () => {
    const { setAddModal } = useContext(ModalContext);
    const [file, setFile] = useState(null);

    const _productname = useInput('', true);
    const _productkey = useInput('', true);
    const _productprice = useInput('', true);
    const _productdesc = useInput('', true);
    const _dateadded = useInput('', true);

    const createProduct = async (e) => {
        try {
            const formData = new FormData();
            if(!_productname.value || !_productkey.value || !_productprice.value || !_productdesc.value || !_dateadded.value) {
                return alert('Поля не могут быть пустыми!');
            }

            if (file != null) {
                formData.append('file', file);
                formData.append('productName', _productname.value);
                formData.append('productKey', _productkey.value);
                formData.append('productPrice', _productprice.value);
                formData.append('productDesc', _productdesc.value);
                formData.append('dateAdded', _dateadded.value);

                await fetch('http://localhost:5000/create-product', {
                    method: 'POST',
                    body: formData
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const changeHandler = (e) => {
        if (e.target.files != null) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={createProduct} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info">
                    <Input type='text' nameInput='Найменування товару' inputId='productName' holderTitle="Введіть назву товару..." inputObject={_productname} />
                    <Input type='text' nameInput='Код товару' inputId='productKey' holderTitle="Введіть код товару..." inputObject={_productkey} />
                    <Input type='text' nameInput='Ціна на товар' inputId='productPrice' holderTitle="Введіть ціну товару..." inputObject={_productprice} />
                    <Input type='text' nameInput='Додайте опис товару' inputId='productDesc' holderTitle="Введіть опис товару..." inputObject={_productdesc} />
                    <Input type='text' nameInput='Дата створення товару' inputId='dateAdded' holderTitle="Введіть дату (дд/мм/рррр)..." inputObject={_dateadded} />
                    <div className="uploader__container">
                        <input type="file" name="uploader" id="fileuploader" onChange={(e) => { changeHandler(e); }}/>
                        <button>Додати картинку</button>
                    </div>
                    <div className="container-buttons">
                        <Button name="Створити" func={() => { console.log('Create product'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setAddModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Create;
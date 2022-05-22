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
                    <Input type='text' nameInput='Название товара' inputId='productName' holderTitle="Введите название товара..." inputObject={_productname} />
                    <Input type='text' nameInput='Ключ товара' inputId='productKey' holderTitle="Введите ключ товара..." inputObject={_productkey} />
                    <Input type='text' nameInput='Цена товара' inputId='productPrice' holderTitle="Введите цену товара..." inputObject={_productprice} />
                    <Input type='text' nameInput='Описание товара' inputId='productDesc' holderTitle="Введите описание товара..." inputObject={_productdesc} />
                    <Input type='text' nameInput='Дата добавления товара' inputId='dateAdded' holderTitle="Введите дату (дд/мм/гггг)..." inputObject={_dateadded} />
                    <div className="uploader__container">
                        <input type="file" name="uploader" id="fileuploader" onChange={(e) => { changeHandler(e); }}/>
                        <button>Добавить изображение</button>
                    </div>
                    <div className="container-buttons">
                        <Button name="Создать" func={() => { console.log('Create product'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setAddModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Create;
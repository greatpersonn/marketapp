import React, { useContext, useState } from 'react';
import QrCodeIcon from '@mui/icons-material/QrCode';
import TitleIcon from '@mui/icons-material/Title';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

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
            if (!_productname.value || !_productkey.value || !_productprice.value || !_productdesc.value || !_dateadded.value) {
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
                    <div className="info-input">
                        <Input type='text' nameInput='Найменування товару' inputId='productName' holderTitle="Введіть назву товару..." inputObject={_productname} />
                        <FontDownloadIcon />
                    </div>
                    <div className="info-input">
                        <Input type='text' nameInput='Код товару' inputId='productKey' holderTitle="Введіть код товару..." inputObject={_productkey} />
                        <QrCodeIcon />
                    </div>
                    <div className="info-input">
                        <Input type='text' nameInput='Ціна на товар' inputId='productPrice' holderTitle="Введіть ціну товару..." inputObject={_productprice} />
                        <AttachMoneyIcon />
                    </div>
                    <div className="info-input">
                        <Input type='text' nameInput='Додайте опис товару' inputId='productDesc' holderTitle="Введіть опис товару..." inputObject={_productdesc} />
                        <TitleIcon />
                    </div>
                    <div className="info-input">
                        <Input type='text' nameInput='Дата створення товару' inputId='dateAdded' holderTitle="Введіть дату (дд/мм/рррр)..." inputObject={_dateadded} />
                        <CalendarMonthIcon />
                    </div>
                    <div className="uploader__container">
                        <input type="file" name="uploader" id="fileuploader" onChange={(e) => { changeHandler(e); }} />
                        <button>Додати зображення</button>
                    </div>
                    <div className="container-buttons">
                        <Button name="Створити" func={() => { console.log('Create product'); }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Create;
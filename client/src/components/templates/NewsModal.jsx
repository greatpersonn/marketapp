import { useContext, useState } from 'react';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

import { ModalContext } from '../../context/modal-context';
import useInput from '../../hooks/useInput';

import './modal.scss';

const NewsModal = () => {
    const date = new Date();

    const [file, setFile] = useState();
    const [newscontent, setContent] = useState('');
    const { setNewsModal } = useContext(ModalContext);

    const _newsheader = useInput('', true);
    const _newstitle = useInput('', true);

    const handleAddNews = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            if (!_newsheader.value || !_newstitle.value) {
                return alert('Поля не могут быть пустыми!');
            }

            if (file != null) {
                formData.append('file', file);
                formData.append('newsHeader', _newsheader.value);
                formData.append('newsTitle', _newstitle.value);
                formData.append('newsContent', newscontent);
                formData.append('newsAuthor', JSON.parse(localStorage.getItem('user')).username);
                formData.append('newsDate', `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);
            }

            const response = await fetch('http://localhost:5000/create-news', {
                method: 'POST',
                body: formData
            })

            const jsonData = await response.json();
            setNewsModal(prev => !prev);

        } catch (err) {
            console.error(err);
        }
    }

    const changeHandler = (e) => {
        if (e.target.files != null) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleAddNews} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-news">
                    <p>Создать новость</p>
                    <Input type='text' nameInput='Заголовок' inputId='newsHeader' holderTitle="Введите заголовок" inputObject={_newsheader} />
                    <Input type='text' nameInput='Краткое описание' inputId='newsTitle' holderTitle="Введите краткое описание" inputObject={_newstitle} />
                    <div className="container-textarea">
                        <label htmlFor="newsContent">
                            Текст новости
                        </label>
                        <textarea name="news-content" id="newsContent" placeholder="Введите текст новости" onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div className="uploader__container">
                        <input type="file" name="uploader" id="fileuploader" onChange={(e) => { changeHandler(e); }} />
                        <button>Добавить изображение</button>
                    </div>
                    <Button name="Создать новость" func={() => { console.log('Create news!'); }} />
                </div>
            </div>
        </form>
    );
}

export default NewsModal;
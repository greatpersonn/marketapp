import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Newscard from "../organisms/Newscard";
import Navigation from '../organisms/Navigation';

import useInput from "../../hooks/useInput";

import './news.scss';

const News = () => {
    const [news, setNews] = useState([]);
    const [file, setFile] = useState();
    const [newscontent, setContent] = useState('');
    const { statusLogin } = useContext(AuthContext);

    const _newsheader = useInput('', true);
    const _newstitle = useInput('', true);

    let date = new Date();

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
            setNews(previous => [...previous, jsonData.article]);
        } catch (err) {
            console.error(err);
        }
    }

    const handleLoadNews = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-news', {
                method: 'GET'
            });

            const jsonData = await response.json();
            setNews(jsonData.articles);
        } catch (error) {
            console.error(error);
        }
    }

    const changeHandler = (e) => {
        if (e.target.files != null) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        handleLoadNews();
    }, []);

    return (
        <div className="container-news">
            <Navigation />
            {
                (statusLogin !== true || JSON.parse(localStorage.getItem('user')).userrole === 'Moderator' || JSON.parse(localStorage.getItem('user')).userrole === 'Admin') &&
                <form onSubmit={handleAddNews}>
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
                </form>
            }
            {
                news.map((article, id) => (
                    <Newscard article={article} key={id} />
                ))
            }
        </div>
    );
}

export default News;
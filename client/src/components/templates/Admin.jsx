import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../atoms/Button';
import Create from '../templates/Create';
import NewsModal from '../templates/NewsModal';

import { AuthContext } from '../../context/auth-context';
import { ModalContext } from '../../context/modal-context';

import './admin.scss';
import Navigation from '../organisms/Navigation';

const Admin = () => {
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });

    const { statusLogin } = useContext(AuthContext);
    const { isAddModal, setAddModal, isNews, setNewsModal } = useContext(ModalContext);


    const handleLoadData = async () => {
        setLoading(true);

        let userdata = JSON.parse(localStorage.getItem('user'));
        setUser(userdata);

        setLoading(false);
    }

    const handleAddProduct = () => {
        setAddModal(prev => !prev);
    }

    const handleAddNews = () => {
        setNewsModal(prev => !prev);
    }

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <>
            <Navigation />
            <div className="container-adminpanel">
                <p>Админ-панель</p>
                <p>Добро пожаловать в админ-панель, {user.username}, хорошей работы!</p>
                {
                    statusLogin ?
                        user.userrole === 'Admin' || user.userrole === 'Moderator' || user.userrole === 'Operator' ?
                            <>
                                {
                                    <div className="title-moder">
                                        <Button name='Добавить продукт' func={() => { handleAddProduct() }} />
                                        <Button name='Добавить новость' func={() => { handleAddNews() }} />
                                        <NavLink to='/users'>Список пользователей</NavLink>
                                        <NavLink to='/orders'>Активные заказы</NavLink>
                                    </div>
                                }
                            </>
                            :
                            <p>No hi!</p>
                        :
                        <p>Dou u know de way?</p>
                }
            </div>

            {
                isAddModal && <Create />
            }

            {
                isNews && <NewsModal />
            }
        </>
    );
}

export default Admin;

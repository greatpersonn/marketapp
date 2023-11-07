import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import Button from '../atoms/Button';
import Navigation from '../organisms/Navigation';
import Modal from '../molecules/Modal';
import Create from './Create';
import NewsModal from './NewsModal';

import { AuthContext } from '../../context/auth-context';

import './admin.scss';

const Admin = () => {
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });
    const [modalNews, setModalNews] = useState(false);
    const [modalProd, setModalProd] = useState(false);

    const { statusLogin } = useContext(AuthContext);


    const handleLoadData = async () => {
        setLoading(true);

        let userdata = JSON.parse(localStorage.getItem('user'));
        setUser(userdata);

        setLoading(false);
    }

    const handleAddProduct = () => {
        setModalProd(prev => !prev);
    }

    const handleAddNews = () => {
        setModalNews(prev => !prev);
    }

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <>
            <Navigation />
            <div className="container-adminpanel">
                <div className="adminpanel-header">
                    <span>Панель адміністратора сайту</span>
                    <span>Привіт, {user.username}, ти авторизувався як адміністратор, можешь виконувати свою роботу, успіхів!</span>
                </div>
                {
                    statusLogin ?
                        user.userrole === 'Admin' || user.userrole === 'Moderator' || user.userrole === 'Operator' ?
                            <>
                                {
                                    <div className="title-moder">
                                        <div className="moder-action-wrapper">
                                            <ShoppingCartIcon />
                                            <Button name='Додати товар' func={() => { handleAddProduct() }} />
                                        </div>
                                        <div className="moder-action-wrapper">
                                            <NewspaperIcon />
                                            <Button name='Додати новину' func={() => { handleAddNews() }} />
                                        </div>
                                        <div className="moder-action-wrapper">
                                            <RecentActorsIcon />
                                            <NavLink to='/users'>Список користувачів</NavLink>
                                        </div>
                                        <div className="moder-action-wrapper">
                                            <LocalShippingIcon />
                                            <NavLink to='/orders'>Статус замовлення</NavLink>
                                        </div>
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
                modalProd &&
                <Modal active={modalProd} setActive={setModalProd} header={"Створити товар"}>
                    <Create />
                </Modal>
            }
            {
                modalNews &&
                <Modal active={modalNews} setActive={setModalNews} header={"Створити новину"}>
                    <NewsModal />
                </Modal>
            }
        </>
    );
}

export default Admin;

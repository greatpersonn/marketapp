import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../atoms/Logo';
import Search from '../molecules/Search';
import Create from '../templates/Create';
import Button from '../atoms/Button';
import Navigation from './Navigation';

import { ModalContext } from '../../context/modal-context';
import { AuthContext } from '../../context/auth-context';

import './title.scss';

const Title = () => {
    const { isAddModal, setAddModal } = useContext(ModalContext);
    const { statusLogin } = useContext(AuthContext);
    const [user, setUser] = useState({ userimage: 'defaultUser', username: '', useremail: '', userrole: 'User' });

    const handleAddProduct = () => {
        setAddModal(prev => !prev);
    }

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('user'));
        setUser(data);
    }, []);

    return (
        <>
            <div className="container-title">
                <div className="title-leftside">
                    <Logo />
                    <Search />
                    {/* {
                        statusLogin ?
                            (user.userrole === 'Admin' || user.userrole === 'Moderator')
                            &&
                            <div className="title-moder">
                                <Button name='Добавить продукт' func={() => { handleAddProduct() }} />
                                <NavLink to='/users'>Список пользователей</NavLink>
                            </div>
                            :
                            null
                    } */}
                </div>
                <Navigation />
            </div>
            {
                isAddModal && <Create />
            }
        </>
    );
}

export default Title;
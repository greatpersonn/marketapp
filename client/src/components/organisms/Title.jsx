import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBagShopping, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import Logo from '../atoms/Logo';
import Search from '../molecules/Search';
import Button from '../atoms/Button';
import Create from '../templates/Create';

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
                <Logo />
                <Search />
                <div className="title-icons">
                    <NavLink to='/shop-cart'><FontAwesomeIcon icon={faBagShopping} /></NavLink>
                    <NavLink to='/profile'><FontAwesomeIcon icon={faUser} /></NavLink>
                    <NavLink to='/news'><FontAwesomeIcon icon={faNewspaper} /></NavLink>
                </div>
                {
                    statusLogin ?
                        (user.userrole === 'Admin' || user.userrole === 'Moderator')
                        &&
                        <div className="title-moder">
                            <Button name='Добавить продукт' func={() => { handleAddProduct() }} />
                            <NavLink to='/users'>Список пользователей</NavLink>
                        </div>
                    :
                        null
                }
            </div>
            {
                isAddModal && <Create />
            }
        </>
    );
}

export default Title;
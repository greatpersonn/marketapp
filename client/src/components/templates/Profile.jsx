import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loader from '../atoms/Loader';
import Button from '../atoms/Button';
import Ordercard from '../organisms/Ordercard';
import ProfileModal from './ProfileModal';

import { AuthContext } from "../../context/auth-context";
import { ModalContext } from '../../context/modal-context';

import './profile.scss';

const Profile = () => {
    const [isLoading, setLoading] = useState(false);

    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });
    const [orders, setOrders] = useState([]);

    const { statusLogin, setStatus } = useContext(AuthContext);
    const { isProfile, setProfileModal } = useContext(ModalContext);

    const handleLoadData = async () => {
        setLoading(true);

        let userdata = JSON.parse(localStorage.getItem('user'));
        setUser(userdata);

        const data = { 'Userdata': userdata };

        const response = await fetch('http://localhost:5000/get-user-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const jsonData = await response.json();

        setOrders(jsonData.orders.userorders);

        setLoading(false);
    }

    const handleLogout = () => {
        localStorage.setItem('status_login', false);
        localStorage.removeItem('user');
        setStatus(prev => !prev);
    }

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <div className="container-profile">
            {
                statusLogin ?
                    <>
                        {
                            isLoading ?
                                <Loader />
                                :
                                <>
                                    <div className='profile-info'>
                                        <div className="info-container">
                                            <div className="container-title">
                                                <img src={require(`../../../public/users/${user.userimage}`)} alt="userImage" />
                                                <div className="title-info">
                                                    { user.name != undefined ? <span>{user.name} {user.surname}</span> : <span>{user.username}</span> }
                                                    <span>{user.useremail}</span>
                                                </div>
                                            </div>
                                            {
                                                user.name != undefined ? 
                                                <div className="container-subtitle">
                                                    <div className="subtitle-info">Номер телефону <span>{ user.phone }</span></div>
                                                    <div className="subtitle-info">Місто <span>{ user.city }</span></div>
                                                    <div className="subtitle-info">Поштовий індекс <span>{ user.postalcode }</span></div>
                                                </div> : null
                                            }
                                        </div>

                                        <NavLink to="/">Головна</NavLink>
                                        <NavLink to="/shop-cart">Кошик</NavLink>
                                        <Button name='Особиста інформація' func={() => { setProfileModal(prev => !prev); }} />
                                        {
                                            user.userrole === 'Admin' || user.userrole === 'Moderator' || user.userrole === 'Operator' ? <NavLink to='/adminpanel'>Панель робітника</NavLink> : null
                                        }
                                        <NavLink to="/" onClick={handleLogout}>Вийти з кабінету</NavLink>
                                    </div>
                                    <div className="profile-order">
                                        {
                                            orders.map((order, id) => (
                                                <Ordercard order={order} key={id} />
                                            ))
                                        }
                                    </div>
                                    {
                                        isProfile && <ProfileModal />
                                    }
                                </>
                        }
                    </>
                    :
                    <p>?</p>
            }
        </div>
    );
}

export default Profile;
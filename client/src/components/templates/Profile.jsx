import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loader from '../atoms/Loader';
import Ordercard from '../organisms/Ordercard';

import { AuthContext } from "../../context/auth-context";

import './profile.scss';

const Profile = () => {
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });
    const [orders, setOrders] = useState([]);

    const { statusLogin, setStatus } = useContext(AuthContext);

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
                                        <img src={require(`../../../public/users/${user.userimage}`)} alt="userImage" />
                                        <p>Логин: <span>{user.username}</span></p>
                                        <p>Почта: <span>{user.useremail}</span></p>
                                        <p>Роль: <span>{user.userrole}</span></p>
                                        <NavLink to="/">Главная</NavLink>
                                        <NavLink to="/" onClick={handleLogout}>Выход</NavLink>
                                    </div>
                                    <div className="profile-order">
                                        {
                                            orders.map((order, id) => (
                                                <Ordercard order={order} key={id} />
                                            ))
                                        }
                                    </div>
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
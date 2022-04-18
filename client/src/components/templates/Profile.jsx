import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Loader from '../atoms/Loader';

import { AuthContext } from "../../context/auth-context";

import './profile.scss';

const Profile = () => {
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });

    const { statusLogin } = useContext(AuthContext);

    const handleLoadData = async () => {
        setLoading(true);

        let data = JSON.parse(localStorage.getItem('user'));
        setUser(data);

        setTimeout(() => {
            setLoading(false);
        }, 2500);
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
                                    <img src={require(`../../../public/users/${user.userimage}`)} alt="userImage" />
                                    <p>Логин: <span>{user.username}</span></p>
                                    <p>Почта: <span>{user.useremail}</span></p>
                                    <p>Роль: <span>{user.userrole}</span></p>
                                    <NavLink to="/">Главная</NavLink>
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
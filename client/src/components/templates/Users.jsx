import { useEffect, useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import User from "../organisms/User";
import Loader from '../atoms/Loader';
import Edit from '../templates/Edit';

import { AuthContext } from '../../context/auth-context';

import Modal from "../molecules/Modal";

import './users.scss';

const Users = () => {
    const { statusLogin } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);
    
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ userrole: 'User' });

    const handleLoadUsers = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/get-users', {
            method: 'GET'
        });
        const jsonData = await response.json();
        setUsers(jsonData.users);
        setLoading(false);
    }

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('user'));
        setUser(data);
        handleLoadUsers();
    }, []);

    return (
        <>
            {
                statusLogin ?
                    <>
                        {
                            isLoading ?
                                <Loader />
                                :
                                <div className="container-users">
                                    {
                                        user.userrole === 'Admin' || 'Moderator' ?
                                            users.map((user, id) => (
                                                <User key={id} cardData={user} action={handleLoadUsers} modalAction={setModalActive} />
                                            ))
                                        :
                                            <p>You are not a admin!</p>
                                    }
                                </div>
                        }
                    </>
                    :
                    <NavLink to='/sign-in'>Авторизуватись</NavLink>
            }
            {
                <Modal active={modalActive} setActive={setModalActive} header={'Редагування користувача'}>
                    <Edit />
                </Modal>
            }
        </>
    );
}

export default Users;
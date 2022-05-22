import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { ModalContext } from "../../context/modal-context";

import './user.scss';

const User = (props) => {
    const { setEditModal } = useContext(ModalContext);
    let navigate = useNavigate();

    const handleSetEdit = () => {
        localStorage.setItem('editeduser', JSON.stringify(props.cardData));
        setEditModal(prev => !prev);
    }

    const handleDelete = async () => {
        const response = await fetch('http://localhost:5000/delete-user', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.cardData)
        })

        const jsonData = await response.json();
        if(jsonData.message) {
            navigate('/', { replace: true });
        }
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="container-user">
                <img src={require(`../../../public/users/${props.cardData.userimage}`)} alt="userImage" />
                <p>{props.cardData.username}</p>
                <p>{props.cardData.useremail}</p>
                <p>{props.cardData.userrole}</p>
                <div className="container-tools">
                    <FontAwesomeIcon icon={faPencil} className='tool edit' onClick={() => { handleSetEdit(); }} />
                    <FontAwesomeIcon icon={faTrashCan} className='tool delete' onClick={() => { handleDelete(); }} />
                </div>
            </div>
        </>
    );
}

export default User;
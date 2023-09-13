import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
                <PersonIcon />
                <span>{props.cardData.username}</span>
                <span>{props.cardData.useremail}</span>
                <span>{props.cardData.userrole}</span>
                <div className="container-tools">
                    <EditIcon className='tool edit' onClick={() => { handleSetEdit(); }} />
                    <DeleteIcon className='tool delete' onClick={() => { handleDelete(); }} />
                </div>
            </div>
        </>
    );
}

export default User;
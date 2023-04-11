import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

import { ModalContext } from '../../context/modal-context';
import useInput from '../../hooks/useInput';

import './modal.scss'

const FeedbackModal = ({ order }) => {
    const date = new Date();

    const { setFeedbackModal } = useContext(ModalContext);
    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });
    const [feedback, setFeedback] = useState('');

    const _username = useInput('', true);
    const _usersurname = useInput('', true);
    const _usernumber = useInput('', true);

    const handleLoadData = () => {
        let userdata = JSON.parse(localStorage.getItem('user'));
        setUser(userdata);
    }

    const createFeedback = async (e) => {
        try {
            e.preventDefault();

            const feedbackObj = {
                Username: _username.value,
                Usersurname: _usersurname.value,
                Usernumber: _usernumber.value,
                Feedback: feedback,
                Date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
            }

            const data = { 'OrderNum': order.ordernum, 'Userdata': user, 'Feedback': feedbackObj };
            const response = await fetch('http://localhost:5000/create-user-feedback', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();

            if(jsonData.message) {
                setFeedbackModal(prev => !prev);
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <form onSubmit={createFeedback} className='form-modal'>
            <div className="main__modal-container">
                <div className="container-info">
                    <Input type='text' nameInput='Ім`я' inputId='productName' holderTitle="Введіть своє ім`я..." inputObject={_username} />
                    <Input type='text' nameInput='Прізвище' inputId='productKey' holderTitle="Введіть своє прізвище..." inputObject={_usersurname} />
                    <Input type='text' nameInput='Номер телефону' inputId='productKey' holderTitle="Введіть свій номер телефону..." inputObject={_usernumber} />
                    <div className="container-textarea">
                        <label htmlFor="feedback">Відгук</label>
                        <textarea name="feedback" id="feedback" cols="30" rows="10" onChange={e => setFeedback(e.target.value)}></textarea>
                    </div>
                    <div className="container-buttons">
                        <Button name="Створити відгук" func={() => { console.log('Create product'); }} />
                        <FontAwesomeIcon icon={faXmark} className="closemodal-icon" onClick={() => { setFeedbackModal(prev => !prev) }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default FeedbackModal;
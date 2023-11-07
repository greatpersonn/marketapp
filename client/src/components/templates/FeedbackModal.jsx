import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

import Input from '../atoms/Input';
import Button from '../atoms/Button';

import useInput from '../../hooks/useInput';

import './modal.scss'

const FeedbackModal = ({ order }) => {
    const date = new Date();

    const [user, setUser] = useState({ userimage: 'defaultUser.png', username: '', useremail: '', userrole: 'User' });
    const [feedback, setFeedback] = useState('');
    const [ratingValue, setRatingValue] = useState(0);

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
                Rating: ratingValue,
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
                console.log(jsonData.message);
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
                    <Input type='text' nameInput='Ім`я' inputId='firstName' holderTitle="Введіть своє ім`я..." inputObject={_username} />
                    <Input type='text' nameInput='Прізвище' inputId='lastName' holderTitle="Введіть своє прізвище..." inputObject={_usersurname} />
                    <Input type='text' nameInput='Номер телефону' inputId='phoneNumber' holderTitle="Введіть свій номер телефону..." inputObject={_usernumber} />
                    <div className="container-textarea">
                        <textarea name="feedback" id="feedback" cols="30" rows="10" onChange={e => setFeedback(e.target.value)}></textarea>
                    </div>
                    <Rating name="simple-controlled" value={ratingValue}
                        onChange={(event, newValue) => {
                            setRatingValue(newValue);
                        }}
                    />
                    <div className="container-buttons">
                        <Button name="Створити відгук" func={() => { console.log('Create product'); }} />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default FeedbackModal;
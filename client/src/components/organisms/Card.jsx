import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Button from '../atoms/Button';

import './card.scss';

const Card = (props) => {
    let navigate = useNavigate();

    const handleAdd = async (arg) => {
        try {
            const statusLogin = JSON.parse(localStorage.getItem('status_login'));

            if (statusLogin) {
                const jsonUser = JSON.parse(localStorage.getItem('user'));

                const data = { 'Userdata': jsonUser, 'Productdata': props.cardData };

                const response = await fetch('http://localhost:5000/add-user-product', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })

                const jsonData = await response.json();

                if (jsonData.message) {
                    alert('Продукт был добавлен в вашу корзину!');
                }
            } else {
                navigate('/sign-in', { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleDelete = (data) => {
        console.log(data);
    }

    // const handleProduct = (data) => {
    //     console.log(data)
    //     navigate('/product/' + data.productkey, { replace: true });
    // }

    return (
        <div className="container-card">
            <img src={require(`../../../public/products/${props.cardData.productimage}`)} alt="productImage" />
            <p>{props.cardData.productname}</p>
            <p>{props.cardData.productdesc}</p>
            <p>{props.cardData.productprice} грн</p>
            <Button name='Додати у кошик' func={() => { handleAdd(props.cardData) }} />
            {
                JSON.parse(localStorage.getItem('status_login')) &&
                JSON.parse(localStorage.getItem('user')).userrole == 'Admin' &&
                <div className='card-control'>
                    <FontAwesomeIcon icon={faTrashCan} className='tool delete' onClick={() => { handleDelete(); }} />
                </div>
            }
        </div>
    );
}

export default Card;
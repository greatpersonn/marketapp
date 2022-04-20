import { useState, useContext, useEffect  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import SignIn from './Signin';

import { AuthContext } from "../../context/auth-context";

import './shopcart.scss';
import { NavLink } from "react-router-dom";
import Button from "../atoms/Button";

const Shopcart = () => {
    const { statusLogin } = useContext(AuthContext);
    const [products, setProducts] = useState([]); 

    const handleLoadProducts = async () => {
        const data = { 'Userdata': JSON.parse(localStorage.getItem('user')) };

        const response = await fetch('http://localhost:5000/get-user-products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const jsonData = await response.json();

        setProducts(jsonData.products.userproducts);
    }

    useEffect(() => {
        handleLoadProducts();
    }, []);

    return (
        <>
            {
                statusLogin ?
                    <div className="container-shopcart">
                        <p>Добро пожаловать в вашу корзину, предлагаю вам взглянуть на добавленные товары!</p>
                        <NavLink to='/'>Главная</NavLink>
                        {
                            products.map((prod, id) => (
                                <div className="shopcart-card">
                                    <img src={require(`../../../public/products/${prod.productimage}`)} alt="userImage" />
                                    <div className="card-info">
                                        <p>{prod.productname}</p>
                                        <p>{prod.productdesc}</p>
                                    </div>
                                    <div className="card-price">
                                        <p>{prod.productprice} руб</p>
                                    </div>
                                    <div className="card-tools">
                                        <FontAwesomeIcon icon={faTrashCan} className='tool-delete' onClick={() => { console.log('delete') }} />
                                    </div>
                                </div>
                            ))
                        }
                        <Button name='Оформить заказ' func={() => { console.log('Авторизация пользователя'); }} />
                    </div>
                    :
                    <SignIn />
            }
        </>
    );
}

export default Shopcart;
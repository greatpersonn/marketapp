import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import SignIn from './Signin';
import Button from "../atoms/Button";
import Shopcard from "../organisms/Shopcard";
import Order from "./Order";
import Modal from '../molecules/Modal';

import { AuthContext } from "../../context/auth-context";

import './shopcart.scss';

const Shopcart = () => {
    const { statusLogin } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);
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
                        {
                            products.length > 0 ?
                                <>
                                    <p>Кошик <span>{JSON.parse(localStorage.getItem('user')).username}</span></p>
                                    {
                                        products.map((prod, id) => (
                                            <Shopcard prod={prod} key={id} />
                                        ))
                                    }
                                    <Button name='Створити замовлення' func={() => { setModalActive(prev => !prev); }} />
                                </> :
                                <div className="wrapper-error">
                                    <SentimentVeryDissatisfiedIcon />
                                    <span>Щось мені сумно, що тут нічого немає...</span>
                                    <NavLink to='/'>Головна</NavLink>
                                </div>
                        }
                    </div >
                    :
                    <SignIn />
            }
            {
                modalActive && 
                <Modal active={modalActive} setActive={setModalActive} header={'Оформлення замовлення'}>
                    <Order products={products} />
                </Modal>
            }
        </>
    );
}

export default Shopcart;
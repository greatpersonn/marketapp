import { useState, useContext, useEffect  } from "react";
import { NavLink } from "react-router-dom";

import SignIn from './Signin';
import Button from "../atoms/Button";
import Shopcard from "../organisms/Shopcard";
import Order from "./Order";

import { AuthContext } from "../../context/auth-context";
import { ModalContext } from "../../context/modal-context";

import './shopcart.scss';

const Shopcart = () => {
    const { statusLogin } = useContext(AuthContext);
    const { isOrderModal, setOrderModal } = useContext(ModalContext);
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
                        <p>Кошик <span>{JSON.parse(localStorage.getItem('user')).username}</span></p>
                        {
                            products.map((prod, id) => (
                                <Shopcard prod={prod} key={id} />
                            ))
                        }
                        {
                            products.length <= 0 ? <p>Можливо настав час заповнити кошик свіжою рибкою?</p> : <Button name='Оформлення замовлення' func={() => { setOrderModal(prev => !prev); }} />
                        }
                        <NavLink to='/'>Головна</NavLink>
                    </div>
                    :
                    <SignIn />
            }
            {
                isOrderModal && <Order products={products} />
            }
        </>
    );
}

export default Shopcart;
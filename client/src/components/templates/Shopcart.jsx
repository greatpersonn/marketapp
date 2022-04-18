import { useContext } from "react";
import { useEffect } from "react";

import SignIn from './Signin';

import { AuthContext } from "../../context/auth-context";

import './shopcart.scss';
import { useState } from "react";

const Shopcart = () => {
    const { statusLogin } = useContext(AuthContext);
    const [userProducts, setProducts] = useState([]); 

    const handleLoadProducts = async () => {
        const data = { 'Userdata': JSON.parse(localStorage.getItem('user')) };

        const response = await fetch('http://localhost:5000/get-user-products', {
            method: 'GET'
        })

        const jsonData = await response.json();

        console.log(jsonData)

    }

    useEffect(() => {
        handleLoadProducts();
    }, []);

    return (
        <>
            {
                statusLogin ?
                    <div className="container-shopcart">
                        <p>Welcome to shopcart!</p>
                    </div>
                    :
                    <SignIn />
            }
        </>
    );
}

export default Shopcart;
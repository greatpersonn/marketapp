import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../atoms/Loader";
import Button from '../atoms/Button';

import './orders.scss';

const Orders = () => {
    let navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const [status, setStatus] = useState('Обработка');

    const handleLoadData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get-all-orders', {
                method: 'GET'
            });

            const jsonData = await response.json();
            setOrders(jsonData.orders);
            setLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeStatus = async (arg) => {
        try {
            const data = { 'Order': arg, 'Status': status };
            const response = await fetch('http://localhost:5000/update-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const jsonData = await response.json();
            if (jsonData.message) {
                navigate('/adminpanel', { replace: true });
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <div className="container-orders">
            {isLoading && <Loader />}
            <p>Список замовлень</p>
            {
                orders.map((order, id) => (
                    <div className="container-order" key={id}>
                        <div className="order-info">
                            {order.orderstatus === 'В обробці' && <img src={require('../../assets/images/orderstatus/system.png')} alt="statusImage" />}
                            {order.orderstatus === 'Підтверджений' && <img src={require('../../assets/images/orderstatus/confirmation.png')} alt="statusImage" />}
                            {order.orderstatus === 'Комплектується' && <img src={require('../../assets/images/orderstatus/teamwork.png')} alt="statusImage" />}
                            {order.orderstatus === 'Очікує клієнта' && <img src={require('../../assets/images/orderstatus/wait.png')} alt="statusImage" />}
                            {order.orderstatus === 'Виконано' && <img src={require('../../assets/images/orderstatus/success.png')} alt="statusImage" />}
                            {order.orderstatus === 'Доставлено' && <img src={require('../../assets/images/orderstatus/shipped.png')} alt="statusImage" />}
                            <p>{order.ordernum}</p>
                            <a href={`tel:${order.phonenumber}`}>{order.phonenumber}</a>
                            <p>{order.orderdate}</p>
                        </div>
                        <div className="order-products">
                            <ul> Список товару:
                                {
                                    order.orderproducts.map((prod, id) => (
                                        <li key={id}>{prod.productname}</li>
                                    ))
                                }
                            </ul>
                            <div className="order-payment">Сплачено: { order.payment ? <span>Так</span> : <span>Ні</span> }</div>
                            <div className="order-option">
                                <label htmlFor="get-order">Зміна статусу</label>
                                <select name="get-order" id="get-order" onChange={(e) => { setStatus(e.target.value) }}>
                                    <option value="В обробці">В обробці</option>
                                    <option value="Підтверджений">Підтверджений</option>
                                    <option value="Комплектується">Комплектується</option>
                                    <option value="Очікує клієнта">В очікуванні клієнта</option>
                                    <option value="Виконано">Виконан</option>
                                    <option value="Доставлено">Доставлен</option>
                                </select>
                            </div>
                            <Button name="Змінити" func={() => { handleChangeStatus(order) }} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Orders;
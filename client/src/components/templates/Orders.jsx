import { useEffect, useState } from "react";

import Loader from "../atoms/Loader";
import Button from '../atoms/Button';

import './orders.scss';

const Orders = () => {
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
            <p>Список заказов</p>
            {
                orders.map((order, id) => (
                    <div className="container-order" key={id}>
                        <div className="order-info">
                            {order.orderstatus === 'Обработка' && <img src={require('../../assets/images/orderstatus/system.png')} alt="statusImage" />}
                            {order.orderstatus === 'Подтверждён' && <img src={require('../../assets/images/orderstatus/confirmation.png')} alt="statusImage" />}
                            {order.orderstatus === 'КZZAомплектуется' && <img src={require('../../assets/images/orderstatus/teamwork.png')} alt="statusImage" />}
                            {order.orderstatus === 'Ожидает клиента' && <img src={require('../../assets/images/orderstatus/wait.png')} alt="statusImage" />}
                            {order.orderstatus === 'Выполнен' && <img src={require('../../assets/images/orderstatus/success.png')} alt="statusImage" />}
                            {order.orderstatus === 'Доставлен' && <img src={require('../../assets/images/orderstatus/shipped.png')} alt="statusImage" />}
                            <p>{order.ordernum}</p>
                            <a href={`tel:${order.phonenumber}`}>{order.phonenumber}</a>
                            <p>{order.orderdate}</p>
                        </div>
                        <div className="order-products">
                            <ul> Список товара:
                                {
                                    order.orderproducts.map((prod, id) => (
                                        <li key={id}>{prod.productname}</li>
                                    ))
                                }
                            </ul>
                            <div className="order-option">
                                <label htmlFor="get-order">Смена статуса</label>
                                <select name="get-order" id="get-order" onChange={(e) => { setStatus(e.target.value) }}>
                                    <option value="Обработка">Обработка</option>
                                    <option value="Подтверждён">Подтверждён</option>
                                    <option value="Комплектуется">Комплектуется</option>
                                    <option value="Ожидает клиента">Ожидает клиента</option>
                                    <option value="Выполнен">Выполнен</option>
                                    <option value="Доставлен">Доставлен</option>
                                </select>
                            </div>
                            <Button name="Изменить" func={() => { handleChangeStatus(order) }} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Orders;
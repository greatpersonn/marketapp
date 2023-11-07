import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Loader from "../atoms/Loader";
import Button from '../atoms/Button';
import DropDown from "../atoms/DropDown";

import './orders.scss';

const Orders = () => {
    let navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [isList, setList] = useState(false);

    const [status, setStatus] = useState('В обробці');

    const handleLoadData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get-all-orders', {
                method: 'GET'
            });

            const jsonData = await response.json();
            setOrders(handlerDate(jsonData.orders));
            setLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    const handlerDate = (od) => {
        for (const key in od) {
            for (const index in od[key]) {
                if (index === 'orderdate') {
                    let dateParts = od[key][index].split('.');
                    let newPart = dateParts[2].split(' ');
                    dateParts.pop();
                    dateParts = [...dateParts, newPart[0]];

                    let date = parseInt(dateParts[0], 10);
                    let month = parseInt(dateParts[1], 10);

                    if (month < 10 && month > 0) {
                        dateParts[1] = "0" + month;
                    }

                    if (date < 10 && date > 0) {
                        dateParts[0] = "0" + date;
                    }

                    let timeParts = newPart[1].split(':');
                    let hours = parseInt(timeParts[0], 10);
                    let minutes = parseInt(timeParts[1], 10);

                    if (hours < 10 && hours > 0) {
                        timeParts[0] = "0" + hours;
                    }

                    if (minutes < 10 && minutes > 0) {
                        timeParts[1] = "0" + minutes;
                    }


                    dateParts = dateParts.join('.');
                    timeParts = timeParts.join(":");
                    od[key][index] = dateParts + ' ' + timeParts;
                }
            }
        }

        return od;
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
            <div className="orders-header">
                <span>Список замовлень</span>
            </div>
            {
                orders.map((order, id) => (
                    <div className="container-order" key={id + 1}>
                        <div className="wrapper-order">
                            <div className="order-info">
                                {order.orderstatus === 'В обробці' && <img src={require('../../assets/images/orderstatus/system.png')} alt="statusImage" />}
                                {order.orderstatus === 'Підтверджений' && <img src={require('../../assets/images/orderstatus/confirmation.png')} alt="statusImage" />}
                                {order.orderstatus === 'Комплектується' && <img src={require('../../assets/images/orderstatus/teamwork.png')} alt="statusImage" />}
                                {order.orderstatus === 'Очікує клієнта' && <img src={require('../../assets/images/orderstatus/wait.png')} alt="statusImage" />}
                                {order.orderstatus === 'Виконано' && <img src={require('../../assets/images/orderstatus/success.png')} alt="statusImage" />}
                                {order.orderstatus === 'Доставлено' && <img src={require('../../assets/images/orderstatus/shipped.png')} alt="statusImage" />}
                                <div className="info-title">
                                    <span>Номер замовлення:</span>
                                    <span>{order.ordernum}</span>
                                </div>
                                <div className="info-title">
                                    <span>Телефон клієнта:</span>
                                    <a href={`tel:${order.phonenumber}`}>{order.phonenumber}</a>
                                </div>
                                <div className="info-title">
                                    <span>Дата замовлення:</span>
                                    <span>{order.orderdate}</span>
                                </div>
                                <div className="info-title">
                                    <span>Сплачено:</span>
                                    {order.payment ? <CheckIcon /> : <CloseIcon />}
                                </div>
                            </div>
                            <div className="order-products">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Товар</TableCell>
                                                <TableCell align="right">Кількість</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                order.orderproducts.map((prod, id) => (
                                                    <TableRow key={id}>
                                                        <TableCell>{prod.productname}</TableCell>
                                                        <TableCell align="right">1</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <DropDown key={id} setStatus={setStatus} />
                            </div>
                        </div>
                        <Button name="Змінити" func={() => { handleChangeStatus(order) }} />
                    </div>
                ))
            }
        </div>
    );
}

export default Orders;
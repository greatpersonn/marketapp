import { useContext, useEffect, useState } from 'react';

import Button from '../atoms/Button';
import FeedbackModal from '../templates/FeedbackModal';
import PaymentModal from '../templates/PaymentModal';
import Modal from '../molecules/Modal';

import { ModalContext } from '../../context/modal-context';

import './ordercard.scss';

const Ordercard = ({ order }) => {
    const [orderDate, setOrderDate] = useState(order.orderdate);
    const [modalPayment, setPaymentModal] = useState(false);
    const [modalFeeedback, setFeedbackModal] = useState(false);

    const handlerDate = (order) => {
        let dateParts = order.orderdate.split('.');
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
        setOrderDate(dateParts + ' ' + timeParts);
    }

    useEffect(() => {
        handlerDate(order);
    }, []);

    return (
        <>
            <div className="container-ordercard">
                <div className="ordercard-info">
                    {order.orderstatus === 'В обробці' && <img src={require('../../assets/images/orderstatus/system.png')} alt="statusImage" />}
                    {order.orderstatus === 'Підтверджений' && <img src={require('../../assets/images/orderstatus/confirmation.png')} alt="statusImage" />}
                    {order.orderstatus === 'Комплектується' && <img src={require('../../assets/images/orderstatus/teamwork.png')} alt="statusImage" />}
                    {order.orderstatus === 'Очікує клієнта' && <img src={require('../../assets/images/orderstatus/wait.png')} alt="statusImage" />}
                    {order.orderstatus === 'Виконано' && <img src={require('../../assets/images/orderstatus/success.png')} alt="statusImage" />}
                    {order.orderstatus === 'Доставлено' && <img src={require('../../assets/images/orderstatus/shipped.png')} alt="statusImage" />}
                    <p>{order.orderstatus}</p>
                    <p>№{order.ordernum}</p>
                    <p>{orderDate}</p>
                </div>
                <div className="ordercard-payment">
                    {order.payment ? null : <Button name='Сплатити' func={() => setPaymentModal(prev => !prev)} />}
                </div>
                {
                    (order.orderstatus === 'Виконано' || order.orderstatus === 'Доставлено') &&
                    <div className="ordercard-feedback">
                        <Button name='Залишити відгук' func={() => setFeedbackModal(prev => !prev)} />
                    </div>
                }
            </div>
            {modalFeeedback && 
                <Modal active={modalFeeedback} setActive={setFeedbackModal} header={"Залишити відгук"}>
                    <FeedbackModal order={order} />
                </Modal>
            }
            {modalPayment && 
                <Modal active={modalPayment} setActive={setPaymentModal} header={"Aquapeak.pay"}>
                    <PaymentModal order={order} />
                </Modal>
            }
        </>
    );
}

export default Ordercard;
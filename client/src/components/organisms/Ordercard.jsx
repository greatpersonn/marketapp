import { useContext } from 'react';

import Button from '../atoms/Button';
import FeedbackModal from '../templates/FeedbackModal';

import { ModalContext } from '../../context/modal-context';

import './ordercard.scss';

const Ordercard = ({ order }) => {
    const { isFeedback, setFeedbackModal } = useContext(ModalContext);

    return (
        <>
            <div className="container-ordercard">
                <div className="ordercard-info">
                    {order.orderstatus === 'В обробці' && <img src={require('../../assets/images/orderstatus/system.png')} alt="statusImage" />}
                    {order.orderstatus === 'Підтверджен' && <img src={require('../../assets/images/orderstatus/confirmation.png')} alt="statusImage" />}
                    {order.orderstatus === 'Збирається' && <img src={require('../../assets/images/orderstatus/teamwork.png')} alt="statusImage" />}
                    {order.orderstatus === 'Очікує клієнта' && <img src={require('../../assets/images/orderstatus/wait.png')} alt="statusImage" />}
                    {order.orderstatus === 'Виконано' && <img src={require('../../assets/images/orderstatus/success.png')} alt="statusImage" />}
                    {order.orderstatus === 'Доставлено' && <img src={require('../../assets/images/orderstatus/shipped.png')} alt="statusImage" />}
                    <p>{order.orderstatus}</p>
                    <p>№{order.ordernum}</p>
                    <p>{order.orderdate}</p>
                </div>
                {
                    (order.orderstatus === 'Виконано' || order.orderstatus === 'Доставлено') &&
                    <div className="ordercard-feedback">
                        <Button name='Залишити відгук' func={() => setFeedbackModal(prev => !prev)} />
                    </div>
                }
            </div>
            { isFeedback && <FeedbackModal order={order} /> }
        </>
    );
}

export default Ordercard;
import './ordercard.scss';

const Ordercard = ({ order }) => {
    return(
        <div className="container-ordercard">
            { order.orderstatus === 'Обработка' && <img src={require('../../assets/images/orderstatus/system.png')} alt="statusImage" /> }
            { order.orderstatus === 'Подтверждён' && <img src={require('../../assets/images/orderstatus/confirmation.png')} alt="statusImage" />  }
            { order.orderstatus === 'Комплектуется' && <img src={require('../../assets/images/orderstatus/teamwork.png')} alt="statusImage" />  }
            { order.orderstatus === 'Ожидает клиента' && <img src={require('../../assets/images/orderstatus/wait.png')} alt="statusImage" />  }
            { order.orderstatus === 'Выполнен' && <img src={require('../../assets/images/orderstatus/success.png')} alt="statusImage" />  }
            { order.orderstatus === 'Доставлен' && <img src={require('../../assets/images/orderstatus/shipped.png')} alt="statusImage" />  }
            <p>{order.orderstatus}</p>
            <p>№{order.ordernum}</p>
            <p>{order.orderdate}</p>
        </div>
    );
}

export default Ordercard;
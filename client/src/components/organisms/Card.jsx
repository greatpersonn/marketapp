import Button from '../atoms/Button';

import './card.scss';

const Card = (props) => {

    const handleAdd = async (arg) => {
        try {
            
            const jsonUser = JSON.parse(localStorage.getItem('user'));

            const data = { 'Userdata': jsonUser, 'Productdata': props.cardData };

            const response = await fetch('http://localhost:5000/add-user-product', { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const jsonData = await response.json();

            if(jsonData.message) {
                alert('Продукт был добавлен в вашу корзину!');
            }

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="container-card">
            <img src={require(`../../../public/products/${props.cardData.productimage}`)} alt="productImage" />
            <p>{props.cardData.productname}</p>
            <p>{props.cardData.productdesc}</p>
            <p>{props.cardData.productprice} руб</p>
            <Button name='Добавить в корзину' func={() => { handleAdd(props.cardData) }} />
        </div>
    );
}

export default Card;
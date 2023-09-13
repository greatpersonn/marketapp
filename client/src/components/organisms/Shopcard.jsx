import DeleteIcon from '@mui/icons-material/Delete';
import './shopcard.scss';

const Shopcard = ({ prod }) => {

    const handleDelte = async () => {
        const data = { 'Product': prod, 'Userdata': JSON.parse(localStorage.getItem('user')) };

        const response = await fetch('http://localhost:5000/delete-user-product', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const jsonData = await response.json();

        if(jsonData.message) {
            alert(jsonData.message);
            window.location.reload();
        }

    }

    return (
        <div className="shopcart-card">
            <img src={require(`../../../public/products/${prod.productimage}`)} alt="prodImage" />
            <div className="card-info">
                <p>{prod.productname}</p>
                <p>{prod.productdesc}</p>
            </div>
            <div className="card-price">
                <p>{prod.productprice} грн</p>
            </div>
            <div className="card-tools">
                <DeleteIcon className='tool-delete' onClick={() => { handleDelte(); }} />
            </div>
        </div>
    )
}

export default Shopcard;
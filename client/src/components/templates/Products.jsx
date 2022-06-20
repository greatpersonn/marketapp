import { useEffect, useState } from "react";

import Card from "../organisms/Card";
import Loader from '../atoms/Loader';

import './products.scss';

const Products = () => {
    const [products, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(4);

    const lastProudctIndex = currentPage * productPerPage;
    const firstProudctIndex = lastProudctIndex - productPerPage;
    const currentProducts = products.slice(firstProudctIndex, lastProudctIndex);
    const pageNumber = [1];

    for (let i = 1; i < Math.ceil(products.length / productPerPage); i++) {
        pageNumber.push(i + 1);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleLoadProduct = async () => {
        setLoading(true);
        const response = await fetch('http://localhost:5000/get-products', {
            method: 'GET'
        });

        const jsonData = await response.json();
        setProduct(jsonData.products.reverse());
        setLoading(false);
    }

    useEffect(() => {
        handleLoadProduct();
    }, []);

    return (
        <>
            <div className="container-products">
                {
                    isLoading && <Loader />
                }
                {
                    currentProducts.map((product, id) => (
                        <Card key={id} cardData={product} />
                    ))
                }
            </div>
            <div className="container-pagination">
                {
                    pageNumber.map(number => (
                        <li className='page-item' key={number} onClick={() => { paginate(number) }}>
                            {number}
                        </li>
                    ))
                }
            </div>
        </>
    );
}

export default Products;
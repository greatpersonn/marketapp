import { useEffect, useState } from 'react';

import Loader from '../atoms/Loader';
import Navigation from '../organisms/Navigation';

import './feedbacks.scss';

const Feedbacks = () => {
    const [isLoading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    const handleLoadData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get-all-feedbacks', {
                method: 'GET'
            });

            const jsonData = await response.json();
            setFeedbacks(jsonData.feedbacks);
            setLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleLoadData();
    }, []);

    return (
        <>
            <Navigation />
            <div className="container-feedbacks">
                {isLoading && <Loader />}
                <p>Список отзывов</p>
                {
                    feedbacks.map((feedback, id) => (
                        <div className="feedback-info" key={id}>
                            <div className="info-order">
                                <p>Отзыв о заказе: <span>№{feedback.ordernum}</span></p>
                            </div>
                            <div className="info-user">
                                <p>{feedback.name}</p>
                                <p>{feedback.surname}</p>
                                <p>{feedback.date}</p>
                            </div>
                            <div className="info-feedback">
                                <p>Отзыв:</p>
                                <p>{feedback.feedback}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Feedbacks;
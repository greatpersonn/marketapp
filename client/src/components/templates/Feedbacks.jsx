import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

import Loader from '../atoms/Loader';
import Navigation from '../organisms/Navigation';

import './feedbacks.scss';

const Feedbacks = () => {
    const [isLoading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    const handlerDate = (fb) => {
        for (const key in fb) {
            for (const index in fb[key]) {
                if (index === 'date') {
                    let dateParts = fb[key][index].split('.');
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
                    fb[key][index] = dateParts + ' ' + timeParts;
                }
            }
        }

        return fb;
    }

    const handleLoadData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get-all-feedbacks', {
                method: 'GET'
            });

            const jsonData = await response.json();
            setFeedbacks(handlerDate(jsonData.feedbacks));

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
                {isLoading ? <Loader /> :
                    <>
                        <div className="feedback-header">
                            <p>Відгуки про aquapeak</p>
                            <span>Декілька рибок лишили за собою відгуки на свої замовлення. Ми активно слідкуємо за відгуками наших клієнтів і завжди раді їм - це допомогає нам покращити сервіс і надає натхнення до роботи!</span>
                        </div>
                        <div className="wrapper-feedbacks">
                            {
                                feedbacks.map((feedback, id) => (
                                    <div className="feedback-info" key={id}>
                                        <div className="info-order">
                                            <p>Відгук на замовлення: <span>№{feedback.ordernum}</span></p>
                                            <div className="order-rating">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={feedback.rating}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="info-feedback">
                                            <span>{feedback.feedback}</span>
                                        </div>
                                        <div className="info-user">
                                            <div className="user-name">
                                                <span>{feedback.name} {feedback.surname}</span>
                                            </div>
                                            <span>{feedback.date}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default Feedbacks;
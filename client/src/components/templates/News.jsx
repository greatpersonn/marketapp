import { useEffect, useState } from "react";

import Newscard from "../organisms/Newscard";
import Navigation from '../organisms/Navigation';

import './news.scss';

const News = () => {
    const [news, setNews] = useState([]);

    const handleLoadNews = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-news', {
                method: 'GET'
            });

            const jsonData = await response.json();
            setNews(jsonData.articles);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleLoadNews();
    }, []);

    return (
        <div className="container-news">
            <Navigation />
            {
                news.map((article, id) => (
                    <Newscard article={article} key={id} />
                ))
            }
        </div>
    );
}

export default News;
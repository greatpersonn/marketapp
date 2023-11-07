import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './newscard.scss';

const Newscard = ({ article }) => {
    const [newsDate, setNewsDate] = useState(article.newsdate);
    const [openNews, setOpenNews] = useState(false);

    useEffect(() => {
        let parts = newsDate.split(".");
        let date = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);

        if (month < 10 && month > 0) {
            parts[1] = "0" + month;
        }

        if (date < 10 && date > 0) {
            parts[0] = "0" + date;
        }

        parts = parts.join('.');
        setNewsDate(parts);
    }, []);

    return (
        <div className={openNews ? "container-newscard open" : "container-newscard"}>
            <img src={require(`../../../public/news/${article.newsimage}`)} alt="prodImage" />
            <div className="news-info">
                <div className="info-content">
                    <p>{article.newsheader}</p>
                    <p>{article.newstitle}</p>
                    <p>{article.newscontent}</p>
                </div>
                <div className="info-title">
                    <p>{article.newsauthor}</p>
                    <p>{newsDate}</p>
                </div>
            </div>
            <div className={"news-control"}>
                <KeyboardArrowDownIcon onClick={() => { setOpenNews(prev => !prev); }} />
            </div>
        </div>
    );
}

export default Newscard;
import './newscard.scss';

const Newscard = ({ article }) => {
    return (
        <div className="container-newscard">
            <img src={require(`../../../public/news/${article.newsimage}`)} alt="prodImage" />
            <div className="news-info">
                <div className="info-content">
                    <p>{article.newsheader}</p>
                    <p>{article.newstitle}</p>
                    <p>{article.newscontent}</p>
                </div>
                <div className="info-title">
                    <p>{article.newsauthor}</p>
                    <p>{article.newsdate}</p>
                </div>
            </div>
        </div>
    );
}

export default Newscard;

/* quiero morir agarrado de tu mano */
import Logo from '../atoms/Logo';
import Search from '../molecules/Search';
import Navigation from './Navigation';

import './title.scss';

const Title = () => {
    return (
        <div className="container-title">
            <div className="title-leftside">
                <Logo />
                <Search />
            </div>
            <Navigation />
        </div>
    );
}

export default Title;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import Input from '../atoms/Input';

import useInput from '../../hooks/useInput';

import './search.scss';

const Search = () => {
    const _search = useInput('', true);

    const handleSubmit = () => {
        console.log('Hello, search!');
    }

    return (
        <div className="title-search">
            <form onSubmit={handleSubmit}>
                <Input type='text' nameInput='Что-то ищете?' holderTitle='Введите запрос для поиска' inputObject={_search} inputId='search' />
                <FontAwesomeIcon icon={faSearch} />
            </form>
        </div>
    );
}

export default Search;
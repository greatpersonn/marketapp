import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DropDown = ({ setStatus }) => {
    const [isValue, setValue] = useState('В обробці');
    const [isList, setList] = useState(false);

    const handlerList = (e, data) => {
        setValue(e.target.innerText);
        setStatus(data);
        setList(false);
    }

    return (
        <div className='dropdown-list'>
            <div className="list-header" onClick={() => { setList(prev => !prev) }}>
                <span>{isValue}</span>
                <ArrowDropDownIcon className={`${isList && 'open-list'}`} />
            </div>
            {isList &&
                <div className="list">
                    <li onClick={(e) => handlerList(e, 'В обробці')}>В обробці</li>
                    <li onClick={(e) => handlerList(e, 'Підтверджений')}>Підтверджений</li>
                    <li onClick={(e) => handlerList(e, 'Комплектується')}>Комплектується</li>
                    <li onClick={(e) => handlerList(e, 'Очікує клієнта')}>В очікуванні клієнта</li>
                    <li onClick={(e) => handlerList(e, 'Виконано')}>Виконан</li>
                    <li onClick={(e) => handlerList(e, 'Доставлен')}>Доставлен</li>
                </div>
            }
        </div>
    );
}

export default DropDown;
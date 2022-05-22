import { useState } from 'react';

const useInput = (initial, required) => {
    const [value, setValue] = useState(initial);
    const [_errorstyle, setErrStyle] = useState('');
    const [_errmsg, setErrMsg] = useState(null);

    return {
        value,
        _errorstyle,
        _errmsg,
        onChange: (e) => setValue(e.target.value),
        onBlur: (e) => {
            if(!e.target.value && required) {
                setErrStyle('2px solid #EB0055');
                setErrMsg('This field can not be is empty!');
            } else {
                setErrStyle('2px solid #846aad');
                setErrMsg(null);
            }
        } 
    }
}

export default useInput;
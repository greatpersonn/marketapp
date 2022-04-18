import './input.scss';

const Input = (props) => {
    return (
        <div className="container-input">
            <label htmlFor="input-data">
                {props.nameInput}
            </label>
            <input type={props.type} id={props.inputId} placeholder={props.holderTitle} {...props.inputObject} />
        </div>
    );
}

export default Input;
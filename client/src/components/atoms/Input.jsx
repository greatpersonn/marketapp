import './input.scss';

const Input = (props) => {
    return (
        <div className="container-input">
            <input type={props.type} id={props.inputId} placeholder={props.holderTitle} {...props.inputObject} />
        </div>
    );
}

export default Input;
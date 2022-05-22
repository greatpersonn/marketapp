import './button.scss'

const Button = (props) => {
    return(
        <button type="submit" onClick={() => { props.func() }}>{props.name}</button>
    );
};

export default Button;
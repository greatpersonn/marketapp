import CloseIcon from '@mui/icons-material/Close';
import './Modal.scss';

const Modal = ({ active, setActive, header, children }) => {
    return (
        <div className={active ? "container-modal active" : "container-modal"} onClick={() => { setActive(false); }}>
            <div className={active ? "modal-wrapper active" : "modal-wrapper"} onClick={(e) => { e.stopPropagation(); }} >
                <div className="wrapper-header">
                    <span>{header}</span>
                    <CloseIcon onClick={() => { setActive(false); }} />
                </div>
                { children }
            </div>
        </div>
    )
}

export default Modal;
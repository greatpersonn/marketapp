import 'popup.scss';

const Popup = (props) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <div className="content-header">
                    <span>props.header</span>
                </div>
                <div className="content">
                    <span>props.content</span>
                </div>
            </div>
        </div>
    )
}
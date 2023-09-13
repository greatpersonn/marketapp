import './Text.scss';

const Text = ({ contents }) => {
    return (
        <div className="container-text">
            {
                contents.map((text, id) => (
                    <div key={id} className="text-wrapper">
                        <span>{text}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Text;
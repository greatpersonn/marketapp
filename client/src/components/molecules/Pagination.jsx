import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Pagination = ({ pageNumber, paginate, currentPage, lastIndex }) => {
    const handlerLeft = () => {
        if (currentPage == 1) {
            return;
        } else {
            paginate(currentPage - 1);
        }
    }

    const handlerRight = () => {
        if (currentPage == pageNumber[pageNumber.length - 1]) {
            return;
        } else {
            paginate(currentPage + 1);
        }
    }

    return (
        <div className="container-pagination">
            <KeyboardDoubleArrowLeftIcon onClick={() => { paginate(1) }} />
            <KeyboardArrowLeftIcon onClick={() => { handlerLeft() }} />
            <div className="wrapper-pagination">
                {
                    pageNumber.map(number => (
                        <li className='page-item' key={number} onClick={() => { paginate(number) }}>
                            {number}
                        </li>
                    ))
                }
            </div>
            <KeyboardArrowRightIcon onClick={() => { handlerRight() }} />
            <KeyboardDoubleArrowRightIcon onClick={() => { paginate(pageNumber[pageNumber.length - 1]) }}/>
        </div>
    )
}

export default Pagination;
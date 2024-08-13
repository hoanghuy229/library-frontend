import React from "react";


export const Pagination:React.FC<{currentPage:number, totalPages:number, paginating:any}> = (props) => {
    const pageNumbers = [];

    if(props.currentPage === 1 ){
        pageNumbers.push(props.currentPage);
        if(props.totalPages >= props.currentPage + 1){
            pageNumbers.push(props.currentPage + 1);
        }
        if(props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2);
        }
    }
    else if(props.currentPage > 1){
        if(props.currentPage >= 3){
            pageNumbers.push(props.currentPage - 2);
            pageNumbers.push(props.currentPage - 1);
        }else{
            pageNumbers.push(props.currentPage - 1)
        }
        pageNumbers.push(props.currentPage)
        if(props.totalPages >= props.currentPage + 1){
            pageNumbers.push(props.currentPage + 1)
        }
        if(props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2);
        }
    }

    return(
        <nav aria-label="...">
            <ul className="pagination custom-pagination">
                <li className="page-item" onClick={() => props.paginating(1)}>
                    <button className="page-link">First Page</button>
                </li>
                {
                    pageNumbers.map(page => (
                        <li 
                            key={page}
                            onClick={() => props.paginating(page)} 
                            className={'page-item ' + (props.currentPage === page ? 'active':'')}
                        >
                            <button className="page-link">
                                {page}
                            </button>
                        </li>
                    ))
                }
                <li className="page-item" onClick={() => props.paginating(props.totalPages)}>
                    <button className="page-link">Last Page</button>
                </li>
            </ul>
        </nav>
    )
}
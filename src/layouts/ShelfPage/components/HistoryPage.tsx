import React, { useEffect, useState } from "react";
import { HistoryModel } from "../../../models/HistoryModel";
import { getHistories } from "../../../Service/ShelfApi";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { Pagination } from "../../../utils/Pagination";

export const HistoryPage:React.FC<{getCookies:string | undefined}> = (props) => {
    const [loadingHistory,setLoadingHistory] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [histories,setHistories] = useState<HistoryModel[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    useEffect(() => {
        getHistories(props.getCookies,currentPage-1)
        .then((rs) => {
            setTotalPages(rs.totalPages)
            setHistories(rs.histories)
            setLoadingHistory(false);
        })
        .catch((error:any) => {
            setHttpError(error.message);
            setLoadingHistory(false)
        })

        window.scrollTo(0,0)
    },[currentPage])

    if(loadingHistory){
        return(<SpinnerLoading></SpinnerLoading>)
    }
    if(httpError){
        return(<div className="container m5"><p>{httpError}</p></div>)
    }

    const paginating = (pageNumber:number) => {
        setCurrentPage(pageNumber);
    }

    return(
        <div className="mt-2">
            {
                histories.length > 0 ?
                <>
                    <h2 className="d-flex justify-content-center mt-3 mb-5">Recent History</h2>
                    {
                        histories.map(history => (
                            <div key={history.id}>
                                    <div className="card mt-3 shadow p-3 mb-5 mt-5 bg-body rounded">
                                        <div className="row g-0">
                                            <div className="col-md-2">
                                                <div className="d-none d-lg-block">
                                                    <img src={history.image} width='123' height='196' alt="book"/>
                                                </div>
                                                <div className="d-lg-none d-flex justify-content-center align-items-center">
                                                    <img src={history.image} width='123' height='196' alt="book"/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="card-body">
                                                    <h5 className="card-title">{history.title}</h5>
                                                    <h4>{history.author}</h4>
                                                    <p className="card-text">{history.description}</p>
                                                    <hr/>
                                                    <p className="card-text">Check out on: {history.checkout_date}</p>
                                                    <p className="card-text">Return on: {history.return_date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <hr/>
                            </div>
                        ))
                    }
                </>
                :
                <>
                    <div className="justify-content-center mt-3 mb-5">
                        <h2 style={{marginLeft:"500px"}}>Currently no history</h2>
                        <Link className="btn buttonCustom mt-5" to={`/search`} style={{marginLeft:"550px"}}>Search for a new book</Link>
                    </div>
                </>
            }
            {
                totalPages > 1 && 
                <div className="container-fluid d-flex justify-content-center align-items-center mt-4 mb-5">
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginating={paginating}></Pagination>
                </div>
            }
        </div>
    )
}
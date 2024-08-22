import React, { useEffect, useState } from "react";
import { ShelfCurrentLoansModel } from "../../../models/ShelfCurrentLoansModel";
import { getUserCurrentLoans, renewLoan, returnBook } from "../../../Service/ShelfApi";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans:React.FC<{getCookies:string | undefined}> = (props) => {

    const [httpError,setHttpError] = useState(null);
    const [shelfCurrentLoans,setShelfCurrentLoans] = useState<ShelfCurrentLoansModel[]>([]);
    const [loadingUserLoans,setLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        getUserCurrentLoans(props.getCookies)
        .then((rs) =>{
            setLoadingUserLoans(false)
            setShelfCurrentLoans(rs);
        }
        )
        .catch((error:any) => {setLoadingUserLoans(false);setHttpError(error.message)})

        window.scrollTo(0,0);   
    },[checkout])

    if(loadingUserLoans){
        return (<SpinnerLoading></SpinnerLoading>)
    }
    if(httpError){
        return(<div className="container m-5"><p>{httpError}</p></div>)
    }

    async function returnLoanBook(bookId:number,token:string | undefined) {
        const rs = await returnBook(bookId,token);

        if(rs.includes("return book success")){
            setCheckout(!checkout);
            window.alert(rs);
        }
    }

    async function renewBookLoan(bookId:number,token:string | undefined) {
        const rs = await renewLoan(bookId,token);
        if(rs.includes("renew loan success")){
            setCheckout(!checkout);
            window.alert(rs);
        }
    }

    return (
        <div>
            <div className="d-none d-lg-block mt-2 mb-5">
                {
                    shelfCurrentLoans.length > 0 ?
                    <>
                        <h2 className="d-flex justify-content-center mt-3 mb-5">Current Loans</h2>
                        {
                            shelfCurrentLoans.map(shelfCurrentLoan => (
                                <div key={shelfCurrentLoan.book.id}>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-4 col-md-4 container">
                                            <img src={shelfCurrentLoan.book.image} width='226' height='349' alt="book"></img>
                                        </div>
                                        <div className="card col-3 col-md-3 container d-flex">
                                            <div className="card-body">
                                                <div className="mt-3">
                                                    <h4>Loan Options</h4>
                                                    {
                                                        shelfCurrentLoan.days_left > 0 && 
                                                        <p>Due in {shelfCurrentLoan.days_left} days.</p>
                                                    }
                                                    {
                                                        shelfCurrentLoan.days_left === 0 &&
                                                        <p className="text-success">Due today.</p>
                                                    }
                                                    {
                                                        shelfCurrentLoan.days_left < 0 &&
                                                        <p className="text-danger">Pass due by {shelfCurrentLoan.days_left} days.</p>
                                                    }
                                                    <div className="list-group mt-3">
                                                        <button className="list-group-item list-group-item-action" aria-current='true' 
                                                            data-bs-toggle='modal' data-bs-target={`#modal${shelfCurrentLoan.book.id}`}>
                                                                Manage Loan
                                                        </button>
                                                        <Link to={'/search'} className='list-group-item list-group-item-action'>Search more books ?</Link>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <p className="mt-3">Help other find their adventure by reviewing your loan.</p>
                                                <Link className="btn buttonCustom" to={`/check-out/${shelfCurrentLoan.book.id}`}>Leave a review</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <LoansModal 
                                        shelfCurrentLoan={shelfCurrentLoan} 
                                        returnLoanBook={returnLoanBook}
                                        getCookies={props.getCookies}
                                        renewBookLoan={renewBookLoan}
                                    />
                                </div>
                            ))
                        }
                    </>
                    :
                    <>
                        <div className="justify-content-center mt-3 mb-5">
                            <h2 style={{marginLeft:"500px"}}>Currently no loans</h2>
                            <Link className="btn buttonCustom mt-5" to={`/search`} style={{marginLeft:"550px"}}>Search for a new book</Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { checkoutBook } from "../../Service/CheckoutApi";

export const PaymentResultPage = () => {

    const {bookId} = useParams();

    let bookIdNumber = 0;

    try {
        bookIdNumber = parseInt(bookId + '');
        if (Number.isNaN(bookIdNumber)) {
            bookIdNumber = 0;
        }
    } catch (error) {
        bookIdNumber = 0;
        console.error(error);
    }

    const getCookie = Cookies.get('jwt');


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const getResult = queryParams.get('vnp_ResponseCode');

    if(getCookie === undefined){
        window.location.href='/';
    }

    useEffect(() => {
        if(getResult === '00'){
            checkoutBook(bookIdNumber,getCookie)
        }
    },[])
 
    return(
        <div>
            {
                getResult === '00' ?
                <>
                    <h2><b>success</b></h2>
                    <Link to={`/shelf`} type="button" className="btn btn-success">back to shelf</Link>
                </>
                :
                <>
                    <h2>Check out book failed !!!</h2>
                    <Link to={`/check-out/${bookIdNumber}`} type="button" className="btn btn-success">try again</Link>
                </>
            }
        </div>
    )
}
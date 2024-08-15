import React from "react";
import { BookModel } from "../../models/BookModel";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const CheckOutAndReviewBox:React.FC<{ book?:BookModel }> = (props) => {

    const getCookies = Cookies.get('jwt');

    return (
        <div className='card col-3 container d-flex mb-5' style={{width:'350px',height:'550px'}}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>0/5</b> book checked out
                    </p>
                    <hr className="mt-4 mb-4"/>
                    {
                        props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className="text-success">Available</h4>
                        :
                        <h4 className="text-danger">Wait list</h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies}</b> copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable}</b> available
                        </p>
                    </div>
                </div>
                <hr className="mt-4"/>
                <p className="mt-4">
                    This number can change until placing order has been complete.
                </p>
                <p>Sign in to be able to leave a review</p>
                <hr className="mt-4 mb-5"/>
                {
                    getCookies !== undefined ?
                    <Link to='#' className="btn buttonCustom btn-lg d-flex justify-content-center align-items-center">Hello</Link>
                    :
                    <Link to='/login' className="btn buttonCustom btn-lg d-flex justify-content-center align-items-center">Sign in</Link>
                }
            </div>
        </div>
    )
}
import React from "react";
import { BookModel } from "../../models/BookModel";
import { Link } from "react-router-dom";

export const CheckOutAndReviewBox:React.FC<{ book?:BookModel }> = (props) => {
    return (
        <div className='card col-3 container d-flex mb-5'>
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
                <Link to='#' className="btn buttonCustom btn-lg d-flex justify-content-center align-items-center">Sign in</Link>
            </div>
        </div>
    )
}
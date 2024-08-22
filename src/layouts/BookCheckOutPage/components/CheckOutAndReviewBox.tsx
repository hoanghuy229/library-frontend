import React, { useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserReviewBox } from "./UserReviewBox";

export const CheckOutAndReviewBox:React.FC<{ book?:BookModel, currentLoansCount:number,isCheckedOut:boolean,
    checkoutButtonClicked:any, isReviewLeft:boolean,setIsReviewLeft:any }> = (props) => {


    const getCookies = Cookies.get('jwt');

    function buttonRender(){
        if(getCookies){
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                return (<button onClick={props.checkoutButtonClicked} className="btn buttonCustom btn-lg" style={{width:"300px"}}>Check out</button>)
            }
            else if(props.isCheckedOut){
                return(<p><b>Book checked out. Enjoy!</b></p>)
            }
            else if(!props.isCheckedOut){
                return(<p className="text-danger">Too many books checked out</p>)
            }
        }
        return(<Link to={'/login'} className="btn buttonCustom btn-lg" style={{width:"300px"}}>login</Link>)
    }

    return (
        <div className='card col-3 container d-flex mb-5' style={{width:'350px',height:'600px'}}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5</b> book checked out
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
                <hr className="mt-4 mb-3"/>
                <div className="d-flex justify-content-center align-items-center">
                {buttonRender()}
                </div>
                <hr className="mt-3"/>
                <p className="mt-4">
                    This number can change until placing order has been complete.
                </p>
                {
                    getCookies !== undefined ?
                    <UserReviewBox
                        isReviewLeft={props.isReviewLeft}
                        getCookies={getCookies}
                        bookId={props.book?.id}
                        setIsReviewLeft={props.setIsReviewLeft}
                    />
                    :
                    <p>Sign in to be able to leave a review</p>
                }
                </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { changeBookStatus, changeQuantity } from "../../../Service/BookApi";
import Cookies from "js-cookie";

export const ChangeBookInfo:React.FC<{book:BookModel}> = (props,key) => {
    const [quantity,setQuantity] = useState<number>(0);
    const [remaining,setRemaining] = useState<number>(0);
    const [bookStatus,setBookStatus] = useState<boolean>(props.book.isActived);

    const getJwt = Cookies.get('jwt');

    useEffect(() => {
        const fetchBookInState = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
            props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0);
        }
        fetchBookInState();
    },[])

    async function increaseBookQuantity() {
        changeQuantity(getJwt,props.book.id,'increase');
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }
    async function decreaseBookQuantity() {
        changeQuantity(getJwt,props.book.id,'decrease');
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function activeBook() {
        const confirmed = window.confirm('Are you sure ?');
        if(confirmed){
            changeBookStatus(getJwt,props.book.id,'true');
            setBookStatus(true);
        }
    }
    async function inActiveBook() {
        const confirmed = window.confirm('Are you sure ?');
        if(confirmed){
        changeBookStatus(getJwt,props.book.id,'false');
        setBookStatus(false);
        }
    }


    return(
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        <img src={props.book.image} width='123' height='196' alt="book"></img>
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        <img src={props.book.image} width='123' height='196' alt="book"></img>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Book remaining: <b>{remaining}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Book status: {bookStatus ? <b> enable</b>:<b>disable</b>}
                        </p>
                    </div>
                </div>
                <div className="mt-3 col-md-1">
                    {
                        bookStatus ?
                        <div className="d-flex justify-content-start">
                            <button className="m-1 btn btn-md btn-danger" onClick={inActiveBook}>Disable</button>
                        </div>
                        :
                        <div className="d-flex justify-content-start">
                            <button className="m-1 btn btn-md btn-primary" onClick={activeBook}>Enable</button>
                        </div>
                    }
                </div>
                <button className="m-1 btn btn-md btn-success" onClick={increaseBookQuantity}>Increase Quantity</button>
                <button className="m-1 btn btn-md btn-warning" onClick={decreaseBookQuantity}>Decrease Quantity</button>
            </div>
        </div>
    )
}
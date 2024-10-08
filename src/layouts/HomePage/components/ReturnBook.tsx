import React from "react";
import { BookModel } from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const ReturnBook:React.FC<{book:BookModel}> = (props) => {
    return(
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <div className="text-center">
                        {props.book.image ? 
                            <img 
                                src={props.book.image} 
                                alt="book" 
                                width='151' height='233'
                            />
                            : 
                            <img 
                                src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} 
                                alt="book" 
                                width='151' height='233'
                            />
                        }
                        <h6 className="mt-2">{props.book.title}</h6>
                        <p>{props.book.author}</p>
                        {
                            props.book.isActived ? 
                            <Link className="btn btn-outline-custom" to={`/check-out/${props.book.id}`}>Reserve</Link>
                            :
                            <Link className="btn btn-outline-danger" to='/'>Unavailable</Link>
                        }
                    </div>
                </div>
    )
}
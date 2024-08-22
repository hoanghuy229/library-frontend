import React from "react";
import { BookModel } from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
        <div className="row g-0">
          <div className="col-md-2">
            <div className="d-none d-lg-block">
              {props.book.image ? (
                <img
                  src={props.book.image}
                  width="123"
                  height="196"
                  alt="book"
                ></img>
              ) : (
                <img
                  src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
                  width="123"
                  height="196"
                  alt="book"
                ></img>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title fw-bold">{props.book.title}</h3>
              <h4>{props.book.author}</h4>
              <p className="card-text">{props.book.description}</p>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            {
              props.book.isActived ?
              <Link to={`/check-out/${props.book.id}`} className="btn buttonCustom">View Details</Link>
              :
              <Link to='#' className="btn btn-danger">Unavailable</Link>
            }
          </div>
        </div>
    </div>
  );
};

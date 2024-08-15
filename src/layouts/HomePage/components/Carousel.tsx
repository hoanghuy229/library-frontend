import React from "react";
import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { getCarousel } from "../../../Service/BookApi";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { Link } from "react-router-dom";


export const Carousel = () => {

    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState(null);

    useEffect(() => {
        getCarousel(0,9)
        .then((rs) => {
            setBooks(rs.book);
            setIsLoading(false);
        })
        .catch((error:any) => {setIsLoading(false);setHttpError(error.message)})
    },[]);

    if(isLoading){
        return(
            <SpinnerLoading></SpinnerLoading>
        )
    }

    if(httpError){
        return(
            <div className="container m-5"><p>{httpError}</p></div>
        )
    }

    return(
        <div className="container mt-5" style={{height:550}}>
            <div className="homepage-carousel-title">
                <h2>Popular books</h2>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval='false'>

                {/*desktop*/}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-item-center">
                            {
                                books.slice(0, 3).map(book => (
                                    <ReturnBook book={book} key={book.id}></ReturnBook>
                                ))
                            }
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {
                                books.slice(3, 6).map(book => (
                                    <ReturnBook book={book} key={book.id}></ReturnBook>
                                ))
                            }
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {
                                books.slice(6, 9).map(book => (
                                    <ReturnBook book={book} key={book.id}></ReturnBook>
                                ))
                            }
                        </div>
                    </div>
                    </div>
                    <button 
                        className="carousel-control-prev" 
                        type="button" 
                        data-bs-target='#carouselExampleControls' 
                        data-bs-slide='prev'
                    >
                        <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                        <span className="visually-hidden">previous</span>
                    </button>
                    <button 
                        className="carousel-control-next" 
                        type="button" 
                        data-bs-target='#carouselExampleControls' 
                        data-bs-slide='next'
                    >
                        <span className="carousel-control-next-icon" aria-hidden='true'></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
    )
}
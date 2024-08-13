import React, { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { useParams } from "react-router-dom";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { getBook } from "../../Service/BookApi";
import { StarReview } from "../../utils/StarReview";
import { CheckOutAndReviewBox } from "./CheckOutAndReviewBox";
import { ReviewModel } from "../../models/ReviewModel";
import { getAvgStar, getBookReview } from "../../Service/ReviewApi";
import { LatestReview } from "./LatestReview";

export const BookCheckOutPage = () => {
    const [book,setBook] = useState<BookModel>();
    const [review,setReview] = useState<ReviewModel[]>([]);
    const [totalStars,setTotalStars] = useState(0);
    const [loadingReview,setLoadingReview] = useState(true);
    const [loading,setLoading] = useState(true);
    const [httpError,setHttpError] = useState(null); 

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

    useEffect(() => {
        getBook(bookIdNumber)
        .then(rs => {
            setBook(rs);
            setLoading(false);
        })
        .catch((error:any) => {setLoading(false);setHttpError(error.message)})

        getAvgStar(bookIdNumber)
        .then(result => {
            setTotalStars(result);
        })
        .catch((error:any) => {setLoadingReview(false);setHttpError(error.message)})
    },[bookIdNumber])

    useEffect(() => {
        getBookReview(bookIdNumber)
        .then(rs => {
            setReview(rs);
            setLoadingReview(false);
        })
        .catch((error:any) => {setLoadingReview(false);setHttpError(error.message)})

    })

    if(loading){
        return(
            <SpinnerLoading></SpinnerLoading>
        )
    }

    if(httpError){
        return(
            <div className="container m-5"><p>{httpError}</p></div>
        )
    }


    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5 mb-5">
                    <div className="col-sm-2 col-md-2">
                        {
                            book?.image ?
                            <img src={book?.image} width='226' height='349' alt="book"></img>
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt="book"></img>
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h1>{book?.title}</h1>
                            <h3>{book?.author}</h3>
                            <p className="lead">{book?.description}</p>
                            {
                                totalStars !== 0 ?
                                <div>{StarReview(totalStars, 2)}</div>
                                :
                                <div>{StarReview(5, 2)}</div>
                            }
                        </div> 
                    </div>
                    <CheckOutAndReviewBox book={book}></CheckOutAndReviewBox>
                </div>
                <hr/>
                <LatestReview reviews={review} bookId={book?.id}></LatestReview>
            </div>
        </div>
    )
}
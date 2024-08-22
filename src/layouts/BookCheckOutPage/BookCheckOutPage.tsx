import React, { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { useParams } from "react-router-dom";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { getBook } from "../../Service/BookApi";
import { StarReview } from "../../utils/StarReview";
import { CheckOutAndReviewBox } from "./components/CheckOutAndReviewBox";
import { ReviewModel } from "../../models/ReviewModel";
import { getAvgStar, getBookReview, getUserReviewBook } from "../../Service/ReviewApi";
import { LatestReview } from "./components/LatestReview";
import { getUserCurrentLoansCount, UserCheckedOutBook, checkoutBook } from "../../Service/CheckoutApi";
import Cookies from "js-cookie";
import { Pagination } from "../../utils/Pagination";

export const BookCheckOutPage = () => {
    const [book,setBook] = useState<BookModel>();
    const [review,setReview] = useState<ReviewModel[]>([]);
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [loadingLoansCount, setLoadingLoansCount] = useState(true);
    const [isBookCheckout,setIsBookCheckout] = useState(false);
    const [loadingBookCheckout,setLoadingBookCheckout] = useState(true);
    const [totalStars,setTotalStars] = useState(0);
    const [loadingReview,setLoadingReview] = useState(true);
    const [loading,setLoading] = useState(true);
    const [httpError,setHttpError] = useState(null); 
    const [isReviewLeft,setIsReviewLeft] = useState(false);
    const [loadingUserReview,setLoadingUserReview] = useState(true);
    const [currentReviewPage,setCurrentReviewPage] = useState(1);
    const [totalReviewPages,setTotalReviewPages] = useState(0);
    const [totalReviewElements,setTotalReviewElements] = useState(0);
    const {bookId} = useParams();

    const getCookie = Cookies.get('jwt');

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
    },[bookIdNumber,isBookCheckout])

    useEffect(() => {
        getBookReview(bookIdNumber,currentReviewPage - 1)
        .then((rs) => {
            setReview(rs.review);
            setTotalReviewElements(rs.totalElements);
            setTotalReviewPages(rs.totalPages);
            setLoadingReview(false);
        })
        .catch((error:any) => {setLoadingReview(false);setHttpError(error.message)})

    },[isReviewLeft,currentReviewPage])

    useEffect(() => {
        getUserReviewBook(bookIdNumber,getCookie)
        .then(rs =>{
            setIsReviewLeft(rs);
            setLoadingUserReview(false);
        })
        .catch((error:any) => {setLoadingReview(false);setHttpError(error.message)})
    },[])

    useEffect(() => {
        getUserCurrentLoansCount(getCookie)
        .then(rs => {
            setCurrentLoansCount(rs);
            setLoadingLoansCount(false);
        })
        .catch((error:any) => {setHttpError(error.message)})
    },[isBookCheckout])

    useEffect(() => {
        UserCheckedOutBook(bookIdNumber,getCookie)
        .then(rs => {
            setIsBookCheckout(rs);
            setLoadingBookCheckout(false);
        })
        .catch((error:any)=>{
            setHttpError(error.message)
            setIsBookCheckout(false);
        })
    },[])

    const checkoutButtonClicked = async () => {
        const result = await checkoutBook(bookIdNumber,getCookie);
        setIsBookCheckout(result);
    }

    const paginating = (pageNumber:number) => {setCurrentReviewPage(pageNumber)}

    if(loading || loadingReview || loadingLoansCount || loadingBookCheckout || loadingUserReview){
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
            {
                book?.isActived &&
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
                        <CheckOutAndReviewBox 
                        book={book} 
                        currentLoansCount={currentLoansCount} 
                        isCheckedOut={isBookCheckout}
                        checkoutButtonClicked={checkoutButtonClicked}
                        isReviewLeft={isReviewLeft}
                        setIsReviewLeft={setIsReviewLeft}
                        ></CheckOutAndReviewBox>
                    </div>
                    <hr/>
                    <LatestReview 
                    reviews={review} 
                    bookId={book?.id}
                    paginating={paginating}
                    currentReviewPage={currentReviewPage}
                    totalReviewPages={totalReviewPages}/>
                </div>
            }
        </div>
    )
}
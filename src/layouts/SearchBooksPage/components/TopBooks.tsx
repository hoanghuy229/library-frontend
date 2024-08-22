import React, { useEffect, useState } from "react";
import { BookModel } from "../../../models/BookModel";
import './TopBooks.css'
import { getAvgStar } from "../../../Service/ReviewApi";
import { StarReview } from "../../../utils/StarReview";
import { Link } from "react-router-dom";

export const TopBooks:React.FC<{book: BookModel}> = (props) => {
    const [totalStar,setTotalStar] = useState(0);

    useEffect(() => {
        getAvgStar(props.book.id)
        .then(result => {
            setTotalStar(result);
        })
        .catch((error:any) => {console.log(error)})
    },[props.book.id])


    return(
            <div className="cardTopBooks">
                <div className="photoTopBooks">
                    <img src={props.book.image} alt={props.book.title} />
                </div>
                <div className="descriptionTopBooks">
                    <h3>{props.book.title}</h3>
                    <h4 className="mt-3">{props.book.author}</h4>
                    <h1>{StarReview(totalStar,1.5)}</h1>
                    <h5 className="mt-3">copies: {props.book.copies}</h5>
                    <h5 className="mt-3 mb-3">copies available: {props.book.copiesAvailable}</h5>
                    {
                        props.book.isActived ?
                        <Link to={`/check-out/${props.book.id}`}>
                            <button>View Details</button>
                        </Link>
                        :
                        <Link to='#' className="btn btn-danger">Unavailable</Link>
                    }
                </div>
            </div>
    )
}

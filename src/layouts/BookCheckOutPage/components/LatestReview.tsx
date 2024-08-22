import React from "react";
import { ReviewModel } from "../../../models/ReviewModel";
import { Link } from "react-router-dom";
import { Review } from "./Review";
import { Pagination } from "../../../utils/Pagination";

export const LatestReview:React.FC<{reviews: ReviewModel[],bookId: number | undefined,
    paginating:any, currentReviewPage:number, totalReviewPages:number}> = (props) => {
    return(
        <div className="row mt-5">
            <div className="col-sm-2 col-md-2">
                <h2>Latest Reviews: </h2>
            </div>
            <div className="col-sm-10 col-md-10">
                {props.reviews.length > 0 ? 
                <>
                    {props.reviews.slice(0, 3).map(eachReview => (
                        <Review review={eachReview} key={eachReview.id}></Review>
                    ))}
                    {
                        props.totalReviewPages > 1 &&
                        <div className="mt-5 mb-5" style={{marginLeft:"300px"}}>
                            <Pagination 
                                currentPage={props.currentReviewPage} 
                                paginating={props.paginating} 
                                totalPages={props.totalReviewPages}/>
                        </div>
                    }
                </>
                :
                <div className="m-3">
                    <p style={{marginLeft:"300px",fontSize:"20px"}}><b>no one left a review yet !</b></p>
                </div>
                }
            </div>
        </div>
    )
}
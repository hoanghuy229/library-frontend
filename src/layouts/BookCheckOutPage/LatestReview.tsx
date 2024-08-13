import React from "react";
import { ReviewModel } from "../../models/ReviewModel";
import { Link } from "react-router-dom";
import { Review } from "./Review";

export const LatestReview:React.FC<{reviews: ReviewModel[],bookId: number | undefined}> = (props) => {
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
                    <div className="mt-4 mb-5 d-flex justify-content-center align-items-center">
                        <Link type="button" className="btn buttonCustom" to='#'>Reach all reviews</Link>
                    </div>
                </>
                :
                <div className="m-3">
                    <p className="lead">no review</p>
                </div>
                }
            </div>
        </div>
    )
}
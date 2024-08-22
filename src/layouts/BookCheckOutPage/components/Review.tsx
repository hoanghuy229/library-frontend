import React from "react";
import { ReviewModel } from "../../../models/ReviewModel";
import { StarReview } from "../../../utils/StarReview";
import { format } from 'date-fns';

export const Review:React.FC<{review:ReviewModel}> = (props) => {

    return(
        <div>
            <div className="col-sm-8 col-md-8">
                <h5>{props.review.userEmail}</h5>
                <div className="row">
                    <div className="col">
                        {format(new Date(props.review.date), 'dd/MM/yyyy')}
                    </div>
                    <div className="col">
                    <div>{StarReview(props.review.rating, 1)}</div>
                    </div>
                </div>
                <div className="mt-2">
                    <p>{props.review.reviewDescription}</p>
                </div>
            </div>
            <hr/>
        </div>
    )
}
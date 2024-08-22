import React, { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { createReview } from "../../../Service/ReviewApi";


export const UserReviewBox:React.FC<{isReviewLeft:boolean, getCookies:string | undefined,
    bookId:number | undefined, setIsReviewLeft:any}> = (props) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [rating,setRating] = useState(0);
    const [icon,setIcon] = useState("");
    const [showIcon,setShowIcon] = useState(false);
    const [comment,setComment] = useState('');
    const [httpError,setHttpError] = useState(null);  

    if(httpError){
        return(
            <div className="container m-5"><p>{httpError}</p></div>
        )
    }

    const handleRating = (rate: number) => {
        setRating(rate);  
        setShowCommentForm(true); 
        if(rate === 1){
            setIcon("bi bi-emoji-angry-fill");
        }
        else if(rate === 2){
            setIcon("bi bi-emoji-astonished-fill");
        }
        else if(rate === 3){
            setIcon("bi bi-emoji-expressionless-fill");
        }
        else if(rate === 4){
            setIcon("bi bi-emoji-smile-fill");
        }
        else{
            setIcon("bi bi-emoji-heart-eyes-fill");
        }
        setShowIcon(true);
      }

    const submitReview = async () => {
        const rs:string | undefined = await createReview(props.getCookies,rating,props.bookId,comment);
        if(rs?.includes("review success")){
            props.setIsReviewLeft(true)
        }
        else{
            console.log(Error);
        }
    }

    return(
        <div>
            {
                    props.isReviewLeft === false ?
                    <div>
                        <div className="d-flex">
                        <Rating
                            onClick={handleRating}
                        />
                        {
                            showIcon && (
                                <div style={{marginTop:"1px",marginLeft:"40px"}}>
                                    <i 
                                    className={icon}
                                    style={{fontSize:"30px",color:"#00AE72  "}}>

                                    </i>
                                </div>
                            )
                        }
                        </div>
                        {showCommentForm && (
                            <div className="mt-4">
                                <textarea 
                                placeholder="Leave a comment..." 
                                rows={3} className="form-control mb-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                >
                                </textarea>
                                <button className="btn buttonCustom" onClick={submitReview}>Submit</button>
                            </div>
                        )}
                    </div>
                    :
                    <div className="d-flex justify-content-center align-items-center">
                        <p><b>thanks for your review!</b></p>
                    </div>
                }
        </div>
    )
}
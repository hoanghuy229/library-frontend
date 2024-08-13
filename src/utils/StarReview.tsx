import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';


export const StarReview = (rating:number, size?:number) => {

    let starArray = [];

    const rate:number = Math.round(rating * 2)/2;

    for(let i = 1; i <=5; i++){
        if(i <= rate){
            starArray.push(<i className="bi bi-star-fill" style={{ fontSize: `${size}rem`, color: 'gold' }}/>)
        }
        else if(i - 0.5 === rate){
            starArray.push(<i className="bi bi-star-half" style={{ fontSize: `${size}rem`, color: 'gold' }}/>)
        }
        else{
            starArray.push(<i className="bi bi-star" style={{ fontSize: `${size}rem`, color: 'gold' }}/>)
        }
    } ;

    return starArray;
};

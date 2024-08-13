import React from "react";
import { ReviewModel } from "../models/ReviewModel";

export async function getAvgStar(bookId:number) {
    const baseUrl:string = `http://localhost:8080/api/reviews/search/findAverageRatingByBookId?bookId=${bookId}`;

    const responseAvg = await fetch(baseUrl);

    if(!responseAvg.ok){
        return 0;
    }

    const avgStar = await responseAvg.text();

    const numberStar = parseFloat(avgStar);

    return numberStar;
    
}

export async function getBookReview(bookId:number) {
    
    const baseUrl:string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

    const responseReviews = await fetch(baseUrl);

    if(!responseReviews.ok){
        throw new Error(`something went wrong !!!`);
    }

    const responseJsonReview = await responseReviews.json();

    const responseData = responseJsonReview._embedded.reviews;

    const loadReviews:ReviewModel[] = [];


    for(const key in responseData){
        loadReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            book_id: responseData[key].book_id,
            reviewDescription: responseData[key].reviewDescription,
        })
    }

    return loadReviews;
}
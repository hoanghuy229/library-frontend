import React from "react";
import { ReviewModel } from "../models/ReviewModel";
import { ReviewRequestModel } from "../models/ReviewRequestModel";

interface Result{
    review:ReviewModel[];
    totalPages:number;
    totalElements:number;
}

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

export async function getBookReview(bookId:number,page:number):Promise<Result> {
    const loadReviews:ReviewModel[] = [];

    const baseUrl:string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}&size=3&page=${page}`;

    const responseReviews = await fetch(baseUrl);

    if(!responseReviews.ok){
        throw new Error(`something went wrong !!!`);
    }

    const responseJsonReview = await responseReviews.json();

    const responseData = responseJsonReview._embedded.reviews;

    const responsePages = responseJsonReview.page.totalPages;

    const responseElements = responseJsonReview.page.totalElements;

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

    return {review:loadReviews, totalPages:responsePages, totalElements:responseElements};
}

export async function getUserReviewBook(bookId:number,token:string | undefined) {
    const baseUrl:string = `http://localhost:8080/api/reviews/by-user?bookId=${bookId}`;

    if(token === undefined){
        return false;
    }

    const response = await fetch(baseUrl,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }

    const data = response.json();

    return data;
}

export async function createReview(token:string | undefined,rating:number,bookId:number | undefined,description:string) {
    const baseUrl:string = `http://localhost:8080/api/reviews/create-review`;

    if(token === undefined || bookId === undefined){
        return;
    }

    const requestModel = new ReviewRequestModel(rating,bookId,description);

    const response = await fetch(baseUrl,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestModel)
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }
    
    return "review success";
    
}
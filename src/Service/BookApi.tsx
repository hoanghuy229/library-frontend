import React from "react";
import { BookModel } from "../models/BookModel";

interface Result{
    book:BookModel[];
    totalPages:number;
    totalElements:number;
}

export async function getBook(bookId:number):Promise<BookModel>{

    const baseUrl:string = `http://localhost:8080/api/books/${bookId}`;

    const response = await fetch(baseUrl);

    if(!response.ok){
        throw new Error('something went wrong !!!');
    }

    const responseJson = await response.json();

    const result:BookModel = {
        id:responseJson.id,
        title:responseJson.title,
        author:responseJson.author,
        description:responseJson.description,
        copies:responseJson.copies,
        copiesAvailable:responseJson.copiesAvailable,
        category:responseJson.category,
        image:responseJson.image,
    }

    return result;
}

export async function getCarousel(page:number, size:number):Promise<Result> {
    
    const loadedBooks:BookModel[] = [];

    const baseUrl: string = `http://localhost:8080/api/books?page=${page}&size=${size}`;
            
    const response = await fetch(baseUrl);

    if(!response.ok){
        throw new Error('something went wrong !!!');
    }

    const responseJson = await response.json();

    const responseData = responseJson._embedded.books;

    const responsePages = responseJson.page.totalPages;

    const responseElements = responseJson.page.totalElements;

    for(const key in responseData){
        loadedBooks.push({
            id:responseData[key].id,
            title:responseData[key].title,
            author:responseData[key].author,
            description:responseData[key].description,
            copies:responseData[key].copies,
            copiesAvailable:responseData[key].copiesAvailable,
            category:responseData[key].category,
            image:responseData[key].image,
        })
    }
    return {book:loadedBooks, totalPages:responsePages, totalElements:responseElements};
}

export async function findBooks(page:number, size:number, searchUrl:string, categorySelection:string):Promise<Result> {
    
    const loadedBooks:BookModel[] = [];

    let baseUrl: string = `http://localhost:8080/api/books?page=${page}&size=${size}`;

    if(searchUrl === '' && categorySelection === 'All Books'){
        baseUrl = `http://localhost:8080/api/books?page=${page}&size=${size}`;
    }
    else if(categorySelection !== 'All Books' && searchUrl === ''){
        baseUrl = `http://localhost:8080/api/books/search/findByCategory?category=${categorySelection}&page=${page}&size=${size}`;
    }
    else{
        baseUrl= `http://localhost:8080/api/books/search/findByTitleContainingOrAuthorContaining?title=${searchUrl}&author=${searchUrl}&page=${page}&size=${size}`;
    }
            
    const response = await fetch(baseUrl);

    if(!response.ok){
        throw new Error('something went wrong !!!');
    }

    const responseJson = await response.json();

    const responseData = responseJson._embedded.books;

    const responsePages = responseJson.page.totalPages;

    const responseElements = responseJson.page.totalElements;

    for(const key in responseData){
        loadedBooks.push({
            id:responseData[key].id,
            title:responseData[key].title,
            author:responseData[key].author,
            description:responseData[key].description,
            copies:responseData[key].copies,
            copiesAvailable:responseData[key].copiesAvailable,
            category:responseData[key].category,
            image:responseData[key].image,
        })
    }
    return {book:loadedBooks, totalPages:responsePages, totalElements:responseElements};
}
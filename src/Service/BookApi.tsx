import React from "react";
import { BookModel } from "../models/BookModel";
import { AddBookRequest } from "../models/AddBookRequest";

interface Result{
    book:BookModel[];
    totalPages:number;
    totalElements:number;
}

export async function changeQuantity(token:string | undefined, bookId:number,value:string) {

    let baseUrl:string = '';

    if(value.includes('increase')){
        baseUrl = `http://localhost:8080/api/users/admin/increase-book?bookId=${bookId}`;
    }
    else{
        baseUrl = `http://localhost:8080/api/users/admin/decrease-book?bookId=${bookId}`;
    }

    const response = await fetch(baseUrl,{
        method:"PUT",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }
}

export async function changeBookStatus(token:string | undefined, bookId:number,value:string) {
    const baseUrl:string = `http://localhost:8080/api/users/admin?bookId=${bookId}&status=${value}`;

    const response = await fetch(baseUrl,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }
}

export async function addBook(token:string | undefined, bookModel:AddBookRequest) {
    const baseUrl:string = `http://localhost:8080/api/users/admin`;

    const response = await fetch(baseUrl,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(bookModel)
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }
}

export async function getBook(bookId:number){

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
            isActived:responseJson.actived
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
            isActived:responseData[key].actived
        })
    }
    return {book:loadedBooks, totalPages:responsePages, totalElements:responseElements};
}

export async function getTopBook():Promise<BookModel[]> {

    let booksResult:BookModel[] = [];

    const baseUrl:string = `http://localhost:8080/api/books/search/findTopRatedBooks?page=0&size=10`;

    const response = await fetch(baseUrl);

    if(!response.ok){
        throw new Error('something went wrong !!!');
    }

    const responseJson = await response.json();

    const responseData = responseJson._embedded.books;

    for(const key in responseData){
            booksResult.push({
                id:responseData[key].id,
                title:responseData[key].title,
                author:responseData[key].author,
                description:responseData[key].description,
                copies:responseData[key].copies,
                copiesAvailable:responseData[key].copiesAvailable,
                category:responseData[key].category,
                image:responseData[key].image,
                isActived:responseData[key].actived
            })
    }

    return booksResult;
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
            isActived:responseData[key].actived
        })
    }
    return {book:loadedBooks, totalPages:responsePages, totalElements:responseElements};
}
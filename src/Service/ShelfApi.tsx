import React from "react";
import { ShelfCurrentLoansModel } from "../models/ShelfCurrentLoansModel";
import { HistoryModel } from "../models/HistoryModel";

interface HistoriesResult{
    totalPages:number;
    histories:HistoryModel[];
}

export async function getUserCurrentLoans(token:string | undefined):Promise<ShelfCurrentLoansModel[]> {
    if(token !== undefined){
        const baseUrl:string = `${process.env.REACT_APP_API}/api/users/current-loans`

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

        const responseData = response.json();

        return responseData;
    }
    return [];
}

export async function returnBook(bookId:number,token:string | undefined) {
    if(token === undefined){
        return "error";
    }
    const baseUrl:string = `${process.env.REACT_APP_API}/api/users/return-book?bookId=${bookId}`;

    const response = await fetch(baseUrl,{
        method:"PUT",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }

    return "return book success";
}

export async function renewLoan(bookId:number,token:string | undefined) {
    if(token === undefined){
        return "error";
    }
    const baseUrl:string = `${process.env.REACT_APP_API}/api/users/renew-loan?bookId=${bookId}`;

    const response = await fetch(baseUrl,{
        method:"PUT",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }

    return "renew loan success";
}

export async function getHistories(token:string | undefined,currentPage:number):Promise<HistoriesResult> {
    const baseUrl:string = `${process.env.REACT_APP_API}/api/users/user-histories?page=${currentPage}&size=5`;

    let histories:HistoryModel[] = [];

    if(token === undefined){
        throw new Error('error');
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

    const responseJson = await response.json();
    
    histories = responseJson.histories_response;

    const responseTotalPages = responseJson.total_pages;
    
    return {totalPages: responseTotalPages, histories:histories}
}
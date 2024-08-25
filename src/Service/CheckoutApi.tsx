import React from "react";

export async function getUserCurrentLoansCount(token:string | undefined) {

    const baseUrl:string = `${process.env.REACT_APP_API}/api/checkouts/current-loans-count`;

    if(token === undefined){
        return 0;
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

    const data = response.text();

    const dataInt = parseInt(await data);

    return dataInt;
}

export async function UserCheckedOutBook(bookId:number,token: string | undefined) {

    const baseUrl:string = `${process.env.REACT_APP_API}/api/checkouts?bookId=${bookId}`;

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

export async function checkoutBook(bookId:number,token:string | undefined) {
    const baseUrl:string = `${process.env.REACT_APP_API}/api/checkouts?bookId=${bookId}`;
    
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

    return true;
}

export async function createPayment(token:string | undefined, amount:number,bookId:number) {
    const baseUrl:string = `${process.env.REACT_APP_API}/api/payments?amount=${amount}&bookId=${bookId}`;

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

    const data = await response.json();

    const dataStatus = data.status;
    const dataMessage = data.messages;
    const dataURL = data.url;

    return {status:dataStatus, message:dataMessage, url:dataURL}

}
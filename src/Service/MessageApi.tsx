import React from "react";
import { MessageModel } from "../models/MessageModel";
import { AdminMessageRequest } from "../models/AdminMessageRequest";

interface ResultMessage{
    messages:MessageModel[];
    totalPages:number;
}

export async function createMessage(token:string | undefined,model:MessageModel) {
    const baseUrl:string = `${process.env.REACT_APP_API}/api/messages`;

    const response = await fetch(baseUrl,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(model)
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }
}

export async function adminResponse(token:string | undefined, adminMessage:AdminMessageRequest) {
    const baseUrl:string = `${process.env.REACT_APP_API}/api/messages/admin`;

    const response = await fetch(baseUrl,{
        method:"PUT",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(adminMessage)
    })

    if(!response.ok){
        throw new Error('something wrong!!!');
    }
}

export async function getAllMessage(token:string | undefined,currentPage:number):Promise<ResultMessage> {

    const baseUrl:string = `${process.env.REACT_APP_API}/api/messages?page=${currentPage}&size=5`;

    return getMessages(token,currentPage,baseUrl);
}

export async function adminGetMessages(token:string | undefined,currentPage:number):Promise<ResultMessage> {
    const baseUrl:string = `${process.env.REACT_APP_API}/api/messages/admin?page=${currentPage}&size=5&closed=false`;

    return getMessages(token,currentPage,baseUrl);

}



async function getMessages(token:string | undefined,currentPage:number,url:string):Promise<ResultMessage> {
    const responseMessages:MessageModel[] = [];

    const response = await fetch(url,{
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
    const responseData = responseJson.message_responses;
    const responseTotalPage = responseJson.total_pages;

    for(const key in responseData){
        responseMessages.push({
            title:responseData[key].title,
            question:responseData[key].question,
            id:responseData[key].id,
            user_email:responseData[key].user_email,
            admin_email:responseData[key].admin_email,
            response:responseData[key].response,
            closed:responseData[key].closed,
        })
    }

    return {totalPages:responseTotalPage, messages:responseMessages}
}
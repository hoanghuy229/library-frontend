import React, { useEffect, useState } from "react";
import { MessageModel } from "../../../models/MessageModel";
import { adminGetMessages, adminResponse } from "../../../Service/MessageApi";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { Pagination } from "../../../utils/Pagination";
import { ResponseMessage } from "./ResponseMessage";

export const AdminMessages:React.FC<{getJwt:string | undefined}> = (props) => {
    const [loadingMessages,setLoadingMessages] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [messages,setMessages] = useState<MessageModel[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    useEffect(() => {
        adminGetMessages(props.getJwt, currentPage - 1)
        .then((rs) => {
            setMessages(rs.messages)
            setTotalPages(rs.totalPages)
            setLoadingMessages(false)
        })
        .catch((error:any) => {
            setLoadingMessages(false)
            setHttpError(error.message)
        })
        window.scrollTo(0,0);
    },[currentPage])

    if(loadingMessages){
        return(<SpinnerLoading></SpinnerLoading>)
    }
    if(httpError){
        return(<div className="container m-5"><p>{httpError}</p></div>)
    }

    const paginating = (pageNumber:number) => {setCurrentPage(pageNumber)}

    return(
        <div className="mt-3">
        {messages.length > 0 ?
            <>
                <h5>Pending Q/A:</h5>
                {
                    messages.map(message => (
                        <ResponseMessage 
                        message={message} 
                        key={message.id} 
                        getJwt={props.getJwt}
                        />
                    ))
                }
            </>
            :
            <h5>No pending Q/A</h5>
        }
        {totalPages > 1 && 
            <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
                <Pagination currentPage={currentPage} totalPages={totalPages} paginating={paginating}></Pagination>
            </div>
        }
        </div>
    )
}
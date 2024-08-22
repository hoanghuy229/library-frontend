import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { MessageModel } from "../../../models/MessageModel";
import { getAllMessage } from "../../../Service/MessageApi";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { Pagination } from "../../../utils/Pagination";

export const Messages = () => {
    const getCookies = Cookies.get('jwt');
    const [loadingMessages,setLoadingMessages] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [messages,setMessages] = useState<MessageModel[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    useEffect(() => {
        getAllMessage(getCookies, currentPage - 1)
        .then((rs) => {
            setTotalPages(rs.totalPages)
            setMessages(rs.messages)
            setLoadingMessages(false)
        })
        .catch((error:any) => {setLoadingMessages(false);setHttpError(error.message)})
        window.scrollTo(0,0)
    },[currentPage])

    if(loadingMessages){
        return(
            <SpinnerLoading></SpinnerLoading>
        )
    }

    if(httpError){
        return(
            <div className="container m-5"><p>{httpError}</p></div>
        )
    }

    const paginating = (pageNumber:number) => {setCurrentPage(pageNumber)}
    
    return(
        <div className="mt-2 mb-5">
            {
                messages.length > 0 ? 
                <>
                    <h2 className="d-flex justify-content-center mt-3 mb-5">Current Q/A:</h2>
                    {
                        messages.map(message => (
                            <div key={message.id}>
                                <div className="card mt-2 shadow p-3 bg-body rounded mb-5">
                                    <h5>Case #{message.id}: <b>{message.title}</b></h5>
                                    <h6>User email: <b>{message.user_email}</b></h6>
                                    <p>question: <b> {message.question}</b></p>
                                    <hr/>
                                    <div>
                                        <h5>Response: </h5>
                                        {message.response && message.admin_email ?
                                            <>
                                                <h6>{message.admin_email} (admin)</h6>
                                                <p>{message.response}</p>
                                            </>
                                            :
                                            <p><i>Pending response from admin. Please patient!</i></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </>
                :
                <h2 className="d-flex justify-content-center mt-5 mb-5">All questions you submit will be shown here</h2>
            }
            {totalPages > 1 && 
                <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginating={paginating}></Pagination>
                </div>
            }
        </div>
    )
}
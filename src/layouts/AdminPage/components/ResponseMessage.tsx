import React, { useState } from "react";
import { MessageModel } from "../../../models/MessageModel";
import { adminResponse } from "../../../Service/MessageApi";
import { AdminMessageRequest } from "../../../models/AdminMessageRequest";

export const ResponseMessage:React.FC<{message:MessageModel,getJwt:string | undefined}> = (props,key) => {
    const [displayWarning,setDisplayWarning] = useState(false);
    const [displaySuccess,setDisplaySuccess] = useState(false);
    const [response,setResponse] = useState('');

    async function submitResponse(id:number | undefined,response:string) {
        if(props.getJwt !== undefined && response !== '' && id !== undefined){
            const adminRequest:AdminMessageRequest = {
                id:id,
                response:response
            }
            adminResponse(props.getJwt,adminRequest);
            setDisplaySuccess(true);
            setDisplayWarning(false);
        }
        else{
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
}

    return(
        <div key={props.message.id}>
            <div className="card mt-2 shadow p-3 bg-body rounded mt-3 mb-5">
                <h5>Case #{props.message.id} :{props.message.title}</h5>
                <h6>User: {props.message.user_email}</h6>
                <p>Question: {props.message.question}</p>
                <hr/>
                <div>
                    <h5>Response: </h5>
                    <form action="PUT">
                        {
                            displayWarning && 
                            <div className="alert alert-danger" role="alert">All fields must me filled out</div>
                        }
                        {
                            displaySuccess && 
                            <div className="alert alert-success" role="alert">Response success</div>
                        }
                        <div className="col-md-12 mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} 
                            onChange={e => setResponse(e.target.value)} value={response} placeholder="description"></textarea>
                        </div>
                        <div>
                            <button type="button" className="btn btn-success mt-3" onClick={() => submitResponse(props.message.id,response)}>Submit Response</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
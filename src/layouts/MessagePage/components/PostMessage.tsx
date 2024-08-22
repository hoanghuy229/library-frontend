import React, { useState } from "react";
import { createMessage } from "../../../Service/MessageApi";
import { MessageModel } from "../../../models/MessageModel";
import Cookies from "js-cookie";

export const PostMessage = () => {
    const [title,setTitle] = useState('');
    const [question,setQuestion] = useState('');
    const [displayWarning,setDisplayWarning] = useState(false);
    const [displaySuccess,setDisplaySuccess] = useState(false);

    async function submitQuestion() {
        if(question !== '' && title !== ''){

            const token = Cookies.get('jwt');

            const model:MessageModel = {
                title:title,
                question:question,
            }
            createMessage(token,model)
            setDisplaySuccess(true);
            setDisplayWarning(false);
        }
        else{
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    }

    return(
        <div className="card mt-3">
            <div className="card-header">Ask question to Huy Library admin</div>
            <div className="card-body">
                <form method="POST">
                    {
                        displayWarning && <div className="alert alert-danger" role="alert">filled out all fields</div>
                    }
                    {
                        displaySuccess && <div className="alert alert-success" role="alert">Add question successfully</div>
                    }
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input 
                            type="text" 
                            className="form-control" id="exampleFormControlInput1" placeholder="add a title" 
                            onChange={e => setTitle(e.target.value)} value={title} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Question</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} 
                        placeholder="add a question"
                        onChange={e => setQuestion(e.target.value)} value={question} required/>
                    </div>
                    <div>
                        <button type="button" className="btn btn-success mt-3" onClick={submitQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
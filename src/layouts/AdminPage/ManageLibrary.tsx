import Cookies from "js-cookie";
import React, { useState } from "react";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import { UpdateBook } from "./components/UpdateBook";

export const ManageLibrary = () => {
    
    const getJwt = Cookies.get("jwt");
    const getRole = Cookies.get("role");

    if(getJwt === undefined || getRole !== "ADMIN"){
        window.location.href= '/';
    }

    const [changeBookQuantityClick,setChangeBookQuantityClick] = useState(false);
    const [messagesClick,setMessagesClick] = useState(false);

    function addBookButtonClick(){
        setChangeBookQuantityClick(false);
        setMessagesClick(false);
    }
    function changeQuantityButtonClick(){
        setChangeBookQuantityClick(true);
        setMessagesClick(false);
    }

    function messagesButtonClick(){
        setChangeBookQuantityClick(false);
        setMessagesClick(true);
    }

    return(
        <div className="container">
            <div className="mt-5">
                <h2 className="d-flex justify-content-center">Manage Library</h2>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-add-book-tab" data-bs-toggle='tab' 
                        data-bs-target='#nav-add-book' type="button" role="tab" aria-controls="nav-add-book" 
                        aria-selected='false' style={{color:'black'}}
                        onClick={addBookButtonClick}>
                            Add new book    
                        </button>
                        <button className="nav-link" id="nav-quantity-tab" data-bs-toggle='tab' 
                        data-bs-target='#nav-quantity' type="button" role="tab" aria-controls="nav-quantity" 
                        aria-selected='true' style={{color:'black'}}
                        onClick={changeQuantityButtonClick}>
                            Change quantity 
                        </button>
                        <button className="nav-link" id="nav-message-tab" data-bs-toggle='tab' 
                        data-bs-target='#nav-messages' type="button" role="tab" aria-controls="nav-messages" 
                        aria-selected='false' style={{color:'black'}}
                        onClick={messagesButtonClick}>
                            Messages  
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id='nav-tabContent'>
                    <div className="tab-pane fade show active" id='nav-add-book' role="tabpanel" aria-labelledby="nav-add-book-tab">
                       <AddNewBook getJwt={getJwt}></AddNewBook>
                    </div>
                    <div className="tab-pane fade" id='nav-quantity' role="tabpanel" aria-labelledby="nav-quantity-tab">
                        {
                            changeBookQuantityClick ? <UpdateBook></UpdateBook>:<></>
                        }
                    </div>
                    <div className="tab-pane fade" id='nav-messages' role="tabpanel" aria-labelledby="nav-messages-tab">
                        {
                            messagesClick ? <AdminMessages getJwt={getJwt}></AdminMessages>:<></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
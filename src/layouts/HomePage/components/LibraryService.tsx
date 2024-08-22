import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

export const LibraryService = () => {
    const getCookie = Cookies.get('jwt');

    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-6 fw-bold">Can't find what you're looking for?</h1>
                    <p className="lead">
                        If you can't find what you're looking for,
                        send us a personal message!
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                    {
                                getCookie !== undefined ?
                                <Link className="btn buttonCustom" to="/message" style={{fontSize:20}}>Services</Link>
                                :
                                <Link className="btn buttonCustom" to="/login" style={{fontSize:20}}>Sign up</Link>
                            }
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    )
}
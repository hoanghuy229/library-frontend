import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

export const Heros = () => {
    const getCookie = Cookies.get('jwt');
    return(
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-3'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you!
                            </p>
                            {
                                getCookie !== undefined ?
                                <Link className="btn buttonCustom" to="#" style={{fontSize:20}}>Hello</Link>
                                :
                                <Link className="btn buttonCustom" to="/login" style={{fontSize:20}}>Sign in</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our readers! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
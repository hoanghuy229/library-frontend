import React from "react";

export const TopBook = () => {
    return(
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">Find your next adventure</h1>
                    <p className="col-md-8 fs-4">Where would you like to go next</p>
                    <a className="btn btn-success" href="#" style={{fontSize:20,backgroundColor:'#049e3a'}}>Explore top book</a>
                </div>
            </div>
        </div>
    )
}
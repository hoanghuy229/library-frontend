import React from "react";
import { ShelfCurrentLoansModel } from "../../../models/ShelfCurrentLoansModel";

export const LoansModal:React.FC<{shelfCurrentLoan:ShelfCurrentLoansModel, 
    returnLoanBook:any, renewBookLoan:any, getCookies:string | undefined}> = (props) => {

    return(
        <div className="modal fade" id={`modal${props.shelfCurrentLoan.book.id}`} data-bs-backdrop='static' 
            data-bs-keyboard='false' aria-labelledby="staticBackdropLabel" aria-hidden='true' key={props.shelfCurrentLoan.book.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Loan Options</h5>
                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="mt-3">
                                    <div className="row">
                                        <div className="col-2">
                                            <img src={props.shelfCurrentLoan.book.image} width='56' height='87' alt="book"/>
                                        </div>
                                        <div className="col-10">
                                            <h6>{props.shelfCurrentLoan.book.author}</h6>
                                            <h4>{props.shelfCurrentLoan.book.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    {
                                        props.shelfCurrentLoan.days_left > 0 && 
                                        <p>Due in {props.shelfCurrentLoan.days_left} days.</p>
                                    }
                                    {
                                        props.shelfCurrentLoan.days_left === 0 &&
                                        <p className="text-success">Due today.</p>
                                    }
                                    {
                                        props.shelfCurrentLoan.days_left < 0 &&
                                        <p className="text-danger">Pass due by {props.shelfCurrentLoan.days_left} days.</p>
                                    }
                                    <div className="list-group mt-3">
                                        <button data-bs-dismiss='modal' className="list-group-item list-group-item-action" 
                                        aria-current='true' 
                                        onClick={() => props.returnLoanBook(props.shelfCurrentLoan.book.id,props.getCookies)}>
                                            Return Book
                                        </button>
                                        <button 
                                        data-bs-dissmiss='modal' 
                                        onClick={props.shelfCurrentLoan.days_left < 0 || props.shelfCurrentLoan.days_left === 7 ? 
                                            (event) => event.preventDefault()
                                            :
                                            () => props.renewBookLoan(props.shelfCurrentLoan.book.id,props.getCookies)
                                        }
                                        className={props.shelfCurrentLoan.days_left < 0 ?
                                        'list-group-item list-group-item-action inactiveLink'
                                        :
                                        'list-group-item list-group-item-action'
                                        }>
                                            {props.shelfCurrentLoan.days_left < 0 ? 
                                            'Late dues cannot be renewed' : 'Renew loan for 7 days'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>Close</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
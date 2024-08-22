import React, { useEffect, useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { findBooks } from "../../../Service/BookApi";
import { SpinnerLoading } from "../../../utils/SpinnerLoading";
import { Pagination } from "../../../utils/Pagination";
import { ChangeBookInfo } from "./ChangeBookInfo";

export const UpdateBook = () => {
    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalBooks,setTotalBooks] = useState(0);
    const [totalPages,setTotalPages] = useState(0);

    useEffect(() => {
        findBooks(currentPage - 1, 5,'', 'All Books')
        .then((rs) => {
            setBooks(rs.book);
            setTotalBooks(rs.totalElements);
            setTotalPages(rs.totalPages);
            setIsLoading(false);
        })
        .catch((error:any) => {setIsLoading(false);setHttpError(error.message)})
        window.scrollTo(0 , 0);
    },[currentPage]);

    if(isLoading){
        return(
            <SpinnerLoading></SpinnerLoading>
        )
    }

    if(httpError){
        return(
            <div className="container m-5"><p>{httpError}</p></div>
        )
    }

    const indexOfLastBook: number = currentPage * 5;
    const idexOfFirstBook: number = indexOfLastBook - 5;
    let LastItem = 5 * currentPage <= totalBooks ? 5 * currentPage : totalBooks;
    const paginating = (pageNumber:number) => setCurrentPage(pageNumber);

    return(
        <div className="container mt-5">
            {
                totalBooks > 0 ?
                <>
                    <div className="mt-3">
                        <h3>Number of result: ({totalBooks})</h3>
                    </div>
                    <p>
                        {idexOfFirstBook + 1} to {LastItem} of {totalBooks} items:
                    </p>
                    {
                        books.map(book => (
                            <ChangeBookInfo book={book} key={book.id}></ChangeBookInfo>
                        ))
                    }
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && 
                <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginating={paginating}></Pagination>
                </div>
            }
        </div>
    );
}
import React from "react";
import { BookModel } from "../../models/BookModel";
import { useState,useEffect } from "react"
import { findBooks } from "../../Service/BookApi";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../../utils/Pagination";

export const SearchBooksPage = () => {
    
    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalBooks,setTotalBooks] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [search,setSearch] = useState(false);
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection,setCategorySelection] = useState('All Books');

    useEffect(() => {
        findBooks(currentPage - 1, 5, searchUrl, categorySelection)
        .then((rs) => {
            setBooks(rs.book);
            setTotalBooks(rs.totalElements);
            setTotalPages(rs.totalPages);
            setIsLoading(false);
        })
        .catch((error:any) => {setIsLoading(false);setHttpError(error.message)})
        window.scrollTo(0 , 0);
    },[currentPage, search]);

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

    const handleSearchChange = () => {
        setSearch(!search);
        setCurrentPage(1);
    }

    const categoryField = (value: string) => {
        setCategorySelection(value);
    }

    const indexOfLastBook: number = currentPage * 5;
    const idexOfFirstBook: number = indexOfLastBook - 5;
    let LastItem = 5 * currentPage <= totalBooks ? 5 * currentPage : totalBooks;
    const paginating = (pageNumber:number) => setCurrentPage(pageNumber);

    return(
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input 
                                    className="form-control me-2" 
                                    type="search" 
                                    placeholder="Search" 
                                    aria-labelledby="Search"
                                    onChange={e => setSearchUrl(e.target.value)}
                                ></input>
                                <button className="btn btn-outline-success" onClick={() => handleSearchChange()}>Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button 
                                    className="btn btn-secondary dropdown-toggle" 
                                    type="button" 
                                    id="dropdownMenuButton1" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    {categorySelection} 
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => categoryField('All Books')}>
                                        <a href="#" className="dropdown-item">All Books</a>
                                    </li>
                                    <li onClick={() => categoryField('Front-end')}>
                                        <a href="#" className="dropdown-item">Front-end</a>
                                    </li>
                                    <li onClick={() => categoryField('Back-end')}>
                                        <a href="#" className="dropdown-item">Back-end</a>
                                    </li>
                                    <li onClick={() => categoryField('Data')}>
                                        <a href="#" className="dropdown-item">Data</a>
                                    </li>
                                    <li onClick={() => categoryField('DevOps')}>
                                        <a href="#" className="dropdown-item">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        totalBooks > 0 ? 
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalBooks})</h5>
                            </div>
                            <p>{idexOfFirstBook + 1} to {LastItem} of {totalBooks} items: </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id}></SearchBook>
                            ))}
                        </>
                        :
                        <div className="mt-5 mb-5">
                            <h1 className="d-flex justify-content-center align-items-center">Book not found !!!</h1>
                            <a type="button" className="btn buttonCustom mt-3" href="#" style={{marginLeft:590}}>Library Service</a>
                        </div>
                    }
                    {totalPages > 1 && 
                        <div className="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
                            <Pagination currentPage={currentPage} totalPages={totalPages} paginating={paginating}></Pagination>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../../utils/SpinnerLoading";
import { getTopBook } from "../../Service/BookApi";
import { TopBooks } from "./components/TopBooks";

export const TopBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        getTopBook()
        .then(rs => {
            setBooks(rs);
            setIsLoading(false);
        })
        .catch((error:any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [])

    if (isLoading) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return <div className="container m-5"><p>{httpError}</p></div>;
    }

    return (
        <div>
            <div className="container mb-5 mt-5">
                <h2 className="d-flex justify-content-center">Highest rated Books</h2>
                <div className="containerTopBooks">
                    {books?.map(book => (
                        <TopBooks key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
}

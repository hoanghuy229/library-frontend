import { BookModel } from "./BookModel";

export class ShelfCurrentLoansModel{
    book:BookModel;
    days_left:number;

    constructor(book:BookModel,days_left:number){
        this.book = book;
        this.days_left = days_left;
    }
}

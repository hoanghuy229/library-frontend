export class ReviewRequestModel{
    rating:number;
    book_id:number | undefined;
    review_description?:string;

    constructor(rating:number,book_id:number,review_description:string){
        this.rating = rating;
        this.book_id = book_id;
        this.review_description = review_description;
    }
}
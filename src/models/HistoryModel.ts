export class HistoryModel{
    id:number;
    user_email:string;
    checkout_date:string;
    return_date:string;
    title:string;
    author:string;
    description:string;
    image:string;

    constructor(id:number,user_email:string,checkout_date:string,return_date:string,title:string,author:string,description:string,image:string){
        this.id = id;
        this.user_email = user_email;
        this.checkout_date = checkout_date;
        this.return_date = return_date;
        this.title = title;
        this.author = author;
        this.description = description;
        this.image = image;
    }
}
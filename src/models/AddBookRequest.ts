export class AddBookRequest{
    title:string;
    author?:string;
    description?:string;
    copies?:number;
    category?:string;
    image?:string;

    constructor(title:string, author:string, 
        description:string, copies:number, category:string,image:string){
            this.author = author;
            this.title = title;
            this.description = description;
            this.copies = copies;
            this.category = category;
            this.image = image;
    }
}
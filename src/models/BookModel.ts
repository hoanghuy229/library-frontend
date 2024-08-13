export class BookModel {
    id:number;
    title:string;
    author?:string;
    description?:string;
    copies?:number;
    copiesAvailable?:number;
    category?:string;
    image?:string;

    constructor(id:number, title:string, author:string, 
        description:string, copies:number, copiesAvailable:number, category:string,image:string){
            this.id = id;
            this.author = author;
            this.title = title;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.image = image;
    }
}
export class MessageModel {
    title:string;
    question:string;
    id?:number;
    user_email?:string;
    admin_email?:string;
    response?:string;
    closed?:boolean;

    constructor(title:string,question:string){
        this.title = title;
        this.question = question;
    }
}
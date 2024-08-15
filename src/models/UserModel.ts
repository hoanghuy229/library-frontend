export class UserModel{
    fullName:string;
    email:string;
    phoneNumber:string | null;
    address:string | null;
    accountStatus:boolean;
    role:string;
    token:string;

    constructor(fullName:string, email:string, phoneNumber:string, address:string, accountStatus:boolean, role:string, token:string){
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.accountStatus = accountStatus;
        this.role = role;
        this.token = token;
    }

}
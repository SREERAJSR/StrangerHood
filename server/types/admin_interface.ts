import { userLoginBody } from "./user_interface";

export  interface AdminInterface extends userLoginBody{
    
}

export interface AdminJwtPayload {
    email:string,
    firstname:string,
    isAdmin?:boolean
}
import { ObjectId, Timestamp } from "mongodb"

export  interface  User_Struct{

        firstname: string,
        lastname: string,
        email: string,
        mobile: number,
        gender: string,
        password: string,
        renteredpassword?: string
          };
export interface userDbStructure extends User_Struct{
    createdAt:Date,
    _id:ObjectId,
    isActive:boolean,
    isAdmin?:boolean
}

export interface otpRequestBody {
  otp: string;

}


export interface userOtpDecodedData{
  firstname:string,
  lastname:string,
  email: string,
  mobile: string,
  gender: string,
  password: string,
  iat: number,
  exp: number
}

export interface userLoginBody{
  email:string,
  password:string
}

export interface clientUserInfo{
  firstname:string,
  lastname:string,
  mobile:number,
  email?:string,
  gender:string,
  isActive?:boolean
}


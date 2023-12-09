
import { NextFunction, Request,Response } from "express";
import  { User_Struct, clientUserInfo, otpRequestBody, userDbStructure, userLoginBody, userOtpDecodedData}  from "../types/user_interface";
import { checkEmailIsAlreadyRegistered, hashThePassword, sendOtp, verifyTheOtp, verifyThePassword} from "../services/userAuth";
import User from "../model/user_schema";
import { createToken, extractDataFromToken } from "../services/jwtAuth";
import { saveUserInDb } from "../services/userDb";
import { HttpStatus } from "../types/http";
import AppError from "../utils/AppError";


export  const registerUser= async(req:Request,res:Response,next:NextFunction)=>{

    try{

        const userRegisterDetails=req.body.userData as User_Struct 

         const existingUser= await checkEmailIsAlreadyRegistered(userRegisterDetails.email)
         if(!existingUser){
            if(userRegisterDetails.password !==userRegisterDetails.renteredpassword){
              throw  new AppError('passwords are not same',HttpStatus.BAD_REQUEST)
            }
            const hashedPass: string | undefined = await hashThePassword(userRegisterDetails.password)

            if(!hashedPass) throw new AppError('password hasing error',HttpStatus.INTERNAL_SERVER_ERROR)

            userRegisterDetails.password = hashedPass;
            userRegisterDetails.renteredpassword= hashedPass 
            const otpStatus :string | undefined = await sendOtp(userRegisterDetails.mobile)
console.log(otpStatus);
            if(otpStatus !=='pending')
            {throw new AppError('Twilio otp sending failed',HttpStatus.INTERNAL_SERVER_ERROR)}
            else{
                const token:string=  await createToken(userRegisterDetails)
                res.status(202).json({"token":token,"otpStatus":otpStatus})
            }
         }
    }catch(error){
        next(error)
    } 

 
};

export const otpHandlerAndSaveDb = async (req:Request,res:Response,next:NextFunction) :Promise<void >=>{

try{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) throw new AppError('token didnt recieved',HttpStatus.BAD_REQUEST)
    const{otp}:otpRequestBody=req.body

    if(token){
  const decodedData:userOtpDecodedData |undefined= await extractDataFromToken(token)
    if(!decodedData)throw new AppError('issue with token and not getted decoded data',HttpStatus.CONFLICT)


let otpVerified :string | undefined = await verifyTheOtp(otp,decodedData.mobile)

console.log(otpVerified,'from controller');
if(otpVerified ==='approved'){
const userData = await saveUserInDb(decodedData)
console.log(userData);
if(!userData) throw  new AppError('UserData fetching error',HttpStatus.INTERNAL_SERVER_ERROR)
res.status(HttpStatus.CREATED).json({"message":"register sucess","userData":userData})
}
    } 
}catch(error){  
    next(error)
}

}
export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password }: userLoginBody = req.body;
        const existingUser: boolean | userDbStructure = await checkEmailIsAlreadyRegistered(email);

        if (!existingUser) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ "error": "You are not an existing user with this email" });
        }
        const user: userDbStructure = existingUser as any
        const status: boolean = await verifyThePassword(password, user.password);
        if (status===false) {
            throw new Error("Password is not correct");
        }
        const userClientInfo: clientUserInfo = {
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            mobile: user.mobile
        };
        const token: string | boolean = await createToken(userClientInfo);
        if (!token) {
            throw new Error('Token error');
        }

        res.status(HttpStatus.ACCEPTED).json({ "token": token, userClientInfo });

    } catch (err:any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ "error": "Internal Server Error", "message": err.message });
    }

}

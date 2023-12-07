
import { Request,Response } from "express";
import  { User_Struct, otpRequestBody, userDbStructure, userOtpDecodedData}  from "../types/user_interface";
import { checkEmailIsAlreadyRegistered, hashThePassword, sendOtp, verifyTheOtp} from "../services/userAuth";
import User from "../model/user_schema";
import { createToken, extractDataFromToken } from "../services/jwtAuth";
import { saveUserInDb } from "../services/userDb";


export  const registerUser= async(req:Request,res:Response)=>{

    try{
        const userRegisterDetails:User_Struct ={
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender,
            password: req.body.password,
            renteredpassword: req.body.renteredpassword
        }
        const existingUser = await checkEmailIsAlreadyRegistered(userRegisterDetails.email)
        if(existingUser){
            res.status(400).json({error:'Email is already registerd'});
        }
        if(userRegisterDetails.password !==userRegisterDetails.renteredpassword){
            res.status(401).json({"error":"password and rentered password are not same"})
        }
        const hashedPass: string | undefined = await hashThePassword(userRegisterDetails.password)
        if(!hashedPass) throw new Error('password hasing error')
        userRegisterDetails.password = hashedPass;
        userRegisterDetails.renteredpassword= hashedPass
        const otpStatus :string | undefined = await sendOtp(userRegisterDetails.mobile)
        console.log(otpStatus,'from here');
        const token:string = createToken(userRegisterDetails)
        res.status(201).json({"token":token,"otp-status":otpStatus})

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 

 
};

export const otpHandlerAndSaveDb=async (req:Request,res:Response) :Promise<void >=>{

try{
    const token = req.headers['authorization']?.split(' ')[1];
    const{otp}:otpRequestBody=req.body

    if(token){
  const decodedData:userOtpDecodedData |undefined= await extractDataFromToken(token)
    if(!decodedData){
    res.json(401).json({"error":"token error"})
return;
  }

let otpVerified :string | undefined = await verifyTheOtp(otp,decodedData.mobile)

console.log(otpVerified,'from controller');
if(otpVerified ==='approved'){
const userData :userDbStructure | undefined= await saveUserInDb(decodedData)
if(!userData){
throw new Error('Error saving in db')
}
res.status(201).json({"message":"register sucess","userData":userData})
}
    } 
}catch(error){  
console.log(error);
res.status(500).json({"error":"Internal server error"})
}

}


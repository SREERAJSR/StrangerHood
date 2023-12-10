
import { NextFunction, Request,Response } from "express";
import  { User_Struct, clientUserInfo, otpRequestBody, userDbStructure, userLoginBody, userOtpDecodedData}  from "../types/user_interface";
import { checkEmailIsAlreadyRegistered, hashThePassword, sendOtp, verifyTheOtp, verifyThePassword} from "../services/userAuth";
import User from "../model/user_schema";
import { createToken, extractDataFromToken } from "../services/jwtAuth";
import { saveUserInDb } from "../services/userDb";
import { HttpStatus } from "../types/http";
import AppError from "../utils/AppError";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import configKeys from "../configs/configs";
import nodemailer from "nodemailer";
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
export async function loginUser(req: Request, res: Response,next:NextFunction) {
    try {
        console.log(req.body.loginData);
        const { email, password }: userLoginBody = req.body.loginData;
        const existingUser = await User.findOne({email:email})
        if (!existingUser) {
            throw new AppError('this email hasnt account',HttpStatus.BAD_REQUEST)
        }
        const user: userDbStructure = existingUser as userDbStructure
        const status: boolean = await verifyThePassword(password, user.password);
        if (status===false) {
            throw new AppError('password is not correct',HttpStatus.BAD_REQUEST)
        }
        const userClientInfo: clientUserInfo = {
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            mobile: user.mobile,
            isActive:user.isActive,
            email:user.email
        };
        const token: string | boolean = await createToken(userClientInfo);
        res.status(HttpStatus.ACCEPTED).json({ "token": token, userClientInfo ,"status":true });
    } catch (err:any) {

      next(err)
    }

}

export async function sendEmail(req:Request,res:Response,next:NextFunction){
    try{
        const {email}= req.body;
        const existingUser:userDbStructure|null = await User.findOne({email:email});
        if(!existingUser){
    throw new AppError('User not found to reset the password',HttpStatus.BAD_REQUEST)
        }
        const payload={
            email:existingUser?.email
        }
        const expiryTime:number=300;
        const token = await jwt.sign(payload,configKeys().ACCESSTOKEN_SECRET_KEY,{expiresIn:expiryTime})
        const mailTransporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:configKeys().EMAIL,
                pass:configKeys().PASS_KEY 
            }
        })
        const mailDetails={ 
        from:configKeys().EMAIL,
        to:email,
        subject:"Reset password",
        html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <meta name="x-apple-disable-message-reformatting" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <meta name="color-scheme" content="light dark" /> <meta name="supported-color-schemes" content="light dark" /> <title></title> <style type="text/css" rel="stylesheet" media="all"> /* Base ------------------------------ */ @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap"); body { width: 100% !important; height: 100%; margin: 0; -webkit-text-size-adjust: none; } a { color: #3869D4; } a img { border: none; } td { word-break: break-word; } .preheader { display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; } /* Type ------------------------------ */ body, td, th { font-family: "Nunito Sans", Helvetica, Arial, sans-serif; } h1 { margin-top: 0; color: #333333; font-size: 22px; font-weight: bold; text-align: left; } h2 { margin-top: 0; color: #333333; font-size: 16px; font-weight: bold; text-align: left; } h3 { margin-top: 0; color: #333333; font-size: 14px; font-weight: bold; text-align: left; } td, th { font-size: 16px; } p, ul, ol, blockquote { margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; } p.sub { font-size: 13px; } /* Utilities ------------------------------ */ .align-right { text-align: right; } .align-left { text-align: left; } .align-center { text-align: center; } .u-margin-bottom-none { margin-bottom: 0; } /* Buttons ------------------------------ */ .button { background-color: #3869D4; border-top: 10px solid #3869D4; border-right: 18px solid #3869D4; border-bottom: 10px solid #3869D4; border-left: 18px solid #3869D4; display: inline-block; color: #FFF; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; box-sizing: border-box; } .button--green { background-color: #22BC66; border-top: 10px solid #22BC66; border-right: 18px solid #22BC66; border-bottom: 10px solid #22BC66; border-left: 18px solid #22BC66; } .button--red { background-color: #FF6136; border-top: 10px solid #FF6136; border-right: 18px solid #FF6136; border-bottom: 10px solid #FF6136; border-left: 18px solid #FF6136; } @media only screen and (max-width: 500px) { .button { width: 100% !important; text-align: center !important; } } /* Attribute list ------------------------------ */ .attributes { margin: 0 0 21px; } .attributes_content { background-color: #F4F4F7; padding: 16px; } .attributes_item { padding: 0; } /* Related Items ------------------------------ */ .related { width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .related_item { padding: 10px 0; color: #CBCCCF; font-size: 15px; line-height: 18px; } .related_item-title { display: block; margin: .5em 0 0; } .related_item-thumb { display: block; padding-bottom: 10px; } .related_heading { border-top: 1px solid #CBCCCF; text-align: center; padding: 25px 0 10px; } /* Discount Code ------------------------------ */ .discount { width: 100%; margin: 0; padding: 24px; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #F4F4F7; border: 2px dashed #CBCCCF; } .discount_heading { text-align: center; } .discount_body { text-align: center; font-size: 15px; } /* Social Icons ------------------------------ */ .social { width: auto; } .social td { padding: 0; width: auto; } .social_icon { height: 20px; margin: 0 8px 10px 8px; padding: 0; } /* Data table ------------------------------ */ .purchase { width: 100%; margin: 0; padding: 35px 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .purchase_content { width: 100%; margin: 0; padding: 25px 0 0 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .purchase_item { padding: 10px 0; color: #51545E; font-size: 15px; line-height: 18px; } .purchase_heading { padding-bottom: 8px; border-bottom: 1px solid #EAEAEC; } .purchase_heading p { margin: 0; color: #85878E; font-size: 12px; } .purchase_footer { padding-top: 15px; border-top: 1px solid #EAEAEC; } .purchase_total { margin: 0; text-align: right; font-weight: bold; color: #333333; } .purchase_total--label { padding: 0 15px 0 0; } body { background-color: #F2F4F6; color: #51545E; } p { color: #51545E; } .email-wrapper { width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #F2F4F6; } .email-content { width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } /* Masthead ----------------------- */ .email-masthead { padding: 25px 0; text-align: center; } .email-masthead_logo { width: 94px; } .email-masthead_name { font-size: 16px; font-weight: bold; color: #A8AAAF; text-decoration: none; text-shadow: 0 1px 0 white; } /* Body ------------------------------ */ .email-body { width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; } .email-body_inner { width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #FFFFFF; } .email-footer { width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center; } .email-footer p { color: #A8AAAF; } .body-action { width: 100%; margin: 30px auto; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center; } .body-sub { margin-top: 25px; padding-top: 25px; border-top: 1px solid #EAEAEC; } .content-cell { padding: 45px; } /*Media Queries ------------------------------ */ @media only screen and (max-width: 600px) { .email-body_inner, .email-footer { width: 100% !important; } } @media (prefers-color-scheme: dark) { body, .email-body, .email-body_inner, .email-content, .email-wrapper, .email-masthead, .email-footer { background-color: #333333 !important; color: #FFF !important; } p, ul, ol, blockquote, h1, h2, h3, span, .purchase_item { color: #FFF !important; } .attributes_content, .discount { background-color: #222 !important; } .email-masthead_name { text-shadow: none !important; } } :root { color-scheme: light dark; supported-color-schemes: light dark; } </style> <!--[if mso]> <style type="text/css"> .f-fallback { font-family: Arial, sans-serif; } </style> <![endif]--> </head> <body> <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span> <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center"> <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="email-masthead"> <a href="https://example.com" class="f-fallback email-masthead_name"> [Product Name] </a> </td> </tr> <!-- Email Body --> <tr> <td class="email-body" width="570" cellpadding="0" cellspacing="0"> <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation"> <!-- Body content --> <tr> <td class="content-cell"> <div class="f-fallback"> <h1>Hi${existingUser?.firstname as string},</h1> <p>You recently requested to reset your password for your [Product Name] account. Use the button below to reset it. <strong>This password reset is only valid for the next 5minutes.</strong></p> <!-- Action --> <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td align="center"> <!-- Border based button https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design --> <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"> <tr> <td align="center"> <a href="${configKeys().LIVE_URL}/reset_password/${token}" class="f-fallback button button--green" target="_blank">Reset your password</a> </td> </tr> </table> </td> </tr> </table> <!-- Sub copy --> <table class="body-sub" role="presentation"> <tr> </tr> </table> </div> </td> </tr> </table> </td> </tr> <tr> <td> <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation"> <tr> <td class="content-cell" align="center"> <p class="f-fallback sub align-center"> </p> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body>`
        }
        mailTransporter.sendMail(mailDetails,async(err,data)=>{
            if(err){
                console.log(err);
                throw new AppError('something went wrong while sending email',HttpStatus.INTERNAL_SERVER_ERROR)
            }else{
                return res.status(HttpStatus.CREATED).json({message:"email sent sucesfully"})
            }
        })
    }catch(err){
        
        next(err)
    }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { token, password, renteredpassword } = req.body.payload;
        jwt.verify(token, configKeys().ACCESSTOKEN_SECRET_KEY, async (err: any, _data: any) => {
            try {
                if (err) {
                    throw new AppError("Reset Link is expired", HttpStatus.INTERNAL_SERVER_ERROR);
                } else {
                    const response: userDbStructure = _data as userDbStructure;
                    const user: userDbStructure | null = await User.findOne({ email: response.email });

                    if (user) {
                        const encryptedPassword = await hashThePassword(password);
                        user.password = encryptedPassword;

                        const updatedUser = await User.findOneAndUpdate(
                            { _id: user._id },
                            { $set: user },
                            { new: true }
                        );

                        res.status(HttpStatus.OK).json({ message: "Successfully reset password",statuscode:200 });
                    } else {
                        throw new AppError('User is not there with this email', HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
            } catch (error) {
                next(error); 
            }
        });
    } catch (error) {
        next(error);
    }
}

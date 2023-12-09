

import User from "../model/user_schema"
import bcrypt, { hash } from 'bcrypt'
import { User_Struct, userDbStructure } from "../types/user_interface";
import jwt from 'jsonwebtoken';
import configKeys from "../configs/configs";
import { Twilio } from "twilio";
import AppError from "../utils/AppError";
import { HttpStatus } from "../types/http";
import { NextFunction } from "express";

const accountSid = configKeys().TWILIO_SID
const authToken = configKeys().TWILIO_AUTHTOKEN
const verifySid = configKeys().TWILIO_VERIFY_SID

export const checkEmailIsAlreadyRegistered = async (email: string):Promise<boolean>=> {
    try {
      const existingUser = await User.findOne({ email: email });
      if(existingUser){
        throw new AppError('Email is already registerd',HttpStatus.BAD_REQUEST)
      }
      return false
    } catch (error:any) {
      throw new AppError(error.message, error.statusCode);
    }
  };
  export async function hashThePassword(password: string): Promise<string | undefined> {
    try {
      const saltRounds: number = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error:any) {
throw new AppError(error.message,error.statusCode)
    }
  }

  export const sendOtp= async(mobile:number):Promise<string|undefined>=>{

    try{ 
    const client = new Twilio(accountSid, authToken);
     const verificationStatus =  await client.verify.v2
     .services(verifySid)
     .verifications.create({ to: `+91 ${mobile}`, channel: "sms" })
     return verificationStatus.status

    }catch(err:any){
       throw new AppError(err.message,err.statusCode)
      }
}
export async function verifyTheOtp(otp: string, mobile: string): Promise<string | undefined> {
  try {
    const client  = new Twilio(accountSid,authToken)
    const verificaton_check =await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to:`+91${mobile}`, code: otp});
    console.log(verificaton_check.status);
    return verificaton_check.status
  }catch(err){
    console.error('OTP verification error:', err);
    return undefined;
  }
}

export async function  verifyThePassword(password:string,dbPass:string):Promise<boolean> {
  try{
     const status:boolean =await bcrypt.compare(password,dbPass)
     return status
  }catch(err){
    console.log('Error in hasing the password');
    return false;
  }

}
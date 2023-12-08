

import User from "../model/user_schema"
import bcrypt, { hash } from 'bcrypt'
import { User_Struct, userDbStructure } from "../types/user_interface";
import jwt from 'jsonwebtoken';
import configKeys from "../configs/configs";
import { Twilio } from "twilio";

const accountSid = configKeys().TWILIO_SID
const authToken = configKeys().TWILIO_AUTHTOKEN
const verifySid = configKeys().TWILIO_VERIFY_SID

export const checkEmailIsAlreadyRegistered = async (email: string): Promise<userDbStructure |boolean> => {
    try {
      // Find the user with the given email
      const existingUser = await User.findOne({ email: email });
      // If the user exists, return true; otherwise, return false
      if(!existingUser){
        return false
      }
      return existingUser
    } catch (error) {
      // Handle any errors that occur during the check
      console.error(error);
      return false; // Assuming false means an error or email not registered
    }
  };
  export async function hashThePassword(password: string): Promise<string | undefined> {
    try {
      const saltRounds: number = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  

  export const sendOtp= async(mobile:number):Promise<string|undefined>=>{

    try{ const client = new Twilio(accountSid, authToken);
      await client.verify.v2
     .services(verifySid)
     .verifications.create({ to: `+91 ${mobile}`, channel: "sms" })
     .then((verification) =>{
        console.log(verification.status,'dfsdfsddf')
       //  resolve(verification.status) 
       return verification.status
     }) 

    }catch(err){
      console.log(err+'errrrrrrr');
      return undefined
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
 import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import configKeys from '../configs/configs';
import { User_Struct, userOtpDecodedData } from '../types/user_interface';
import { reject } from 'promise';
import AppError from '../utils/AppError';

const ACCESSTOKEN_SECRET_KEY:string= configKeys().ACCESSTOKEN_SECRET_KEY;

export const createToken = async(userData:any):Promise<string>=>{
    try{
        const token:string =  await jwt.sign(userData,ACCESSTOKEN_SECRET_KEY,{expiresIn:'100 min'})
        return token
    }catch(err:any){
        throw new AppError(err.message,err.statusCode)
    }

      }  
    export  async  function extractDataFromToken (token : string):Promise<userOtpDecodedData |undefined >{
 
        try {
            const decodedData = await jwt.verify(token,ACCESSTOKEN_SECRET_KEY);
            if(!decodedData){
                return undefined
            }

            return decodedData as userOtpDecodedData;   
        } catch (error) {
            console.log('JWT Verification error' + error);
            return undefined;
        }
        }
        

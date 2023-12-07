 import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import configKeys from '../configs/configs';
import { User_Struct, userOtpDecodedData } from '../types/user_interface';
import { reject } from 'promise';

const ACCESSTOKEN_SECRET_KEY:string= configKeys().ACCESSTOKEN_SECRET_KEY;

export const createToken =(userData:User_Struct):string=>{

    const token =  jwt.sign(userData,ACCESSTOKEN_SECRET_KEY,{expiresIn:'100 min'})
    return token
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
        

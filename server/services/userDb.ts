import User from "../model/user_schema";
import { HttpStatus } from "../types/http";
import { User_Struct, clientUserInfo, userDbStructure, userOtpDecodedData } from "../types/user_interface";
import AppError from "../utils/AppError";



export async function saveUserInDb(userData: userOtpDecodedData): Promise<clientUserInfo> {
    try {
      const newUser = new User({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        mobile: userData.mobile,
        gender:userData.gender,
        password: userData.password
      });
      const savedData = await newUser.save();
      const {firstname,lastname,email,mobile,gender,isActive} = savedData.toObject();

      return{
        firstname,
        lastname,
        email,
        mobile,
        gender,
        isActive
      }
    } catch (error:any) {
      throw new AppError(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  
  
}
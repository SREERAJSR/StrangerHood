import User from "../model/user_schema";
import { User_Struct, userDbStructure, userOtpDecodedData } from "../types/user_interface";



export async function saveUserInDb(userData: userOtpDecodedData): Promise< userDbStructure | undefined> {
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
      console.log(savedData);
      return savedData;
    } catch (error) {
      console.error('Error saving user:', error);
      return undefined;
    }
  
  
}
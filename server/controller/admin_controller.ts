import { NextFunction, Request, Response } from "express";
import User from "../model/user_schema";
import AppError from "../utils/AppError";
import { HttpStatus } from "../types/http";
import { AdminJwtPayload } from "../types/admin_interface";
import { userDbStructure } from "../types/user_interface";
import jwt from "jsonwebtoken";
import configKeys from "../configs/configs";
import { verifyThePassword } from "../services/userAuth";

export  async function loginAdmin(req:Request,res:Response,next:NextFunction){
try {
    const{email,password} =req.body;
    const admin:userDbStructure|null = await User.findOne({email:email,isAdmin:true})
    if(!admin){
        throw new AppError("Admin not have this email",HttpStatus.BAD_REQUEST)
    }
  const verificationStatus = await verifyThePassword(password,admin.password)
  if(!verificationStatus) throw new AppError("Entered password is not correct",HttpStatus.BAD_REQUEST)
  if(verificationStatus){
    const payload:AdminJwtPayload={
        email:admin.email,
        firstname:admin.firstname,
        isAdmin:admin.isAdmin
    }
    const token:string|undefined =await jwt.sign(payload,configKeys().ACCESSTOKEN_SECRET_KEY,{expiresIn:"50min"})
    if(!token) throw new AppError("something went wrong in making token",HttpStatus.INTERNAL_SERVER_ERROR)
    if(token) res.status(HttpStatus.ACCEPTED).json({message:"Admin login sucess",status:"accepted",token:token})
}
} catch (error) {
    next(error)
}
}
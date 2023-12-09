import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const errorHandlingMiddleware=(error:AppError,req:Request,res:Response,next:NextFunction)=>{

    error.statusCode = error.statusCode || 500;
    error.status = error.status ||'error';
    console.log(error);

    if(error.statusCode ===404){
        res.status(error.statusCode).json({ errors: error.status, errorMessage: error.message })
    }
    res.status(error.statusCode).json({ status: error.status,message: error.message})

}
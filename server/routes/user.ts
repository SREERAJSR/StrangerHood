import express, { Router } from 'express';
import { loginUser, otpHandlerAndSaveDb, registerUser } from '../controller/user_controller';

const userRouter =()=>{
    const router = Router();
    router.post('/register',registerUser)
    router.post('/otp',otpHandlerAndSaveDb)
    router.post('/login',loginUser)

    return router
}

export default userRouter;
     
import express, { Router } from 'express';
import { otpHandlerAndSaveDb, registerUser } from '../controller/user_controller';

const userRouter =()=>{
    const router = Router();
    router.post('/register',registerUser)
    router.post('/otp',otpHandlerAndSaveDb)

    return router
}

export default userRouter;
     
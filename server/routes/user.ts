import express, { Router } from 'express';
import { loginUser, otpHandlerAndSaveDb, registerUser, sendEmail,resetPassword} from '../controller/user_controller';

const userRouter =()=>{
    const router = Router();
    router.post('/register',registerUser)
    router.post('/otp',otpHandlerAndSaveDb)
    router.post('/login',loginUser)
    router.post('/send_email',sendEmail)
    router.patch('/reset_password',resetPassword)
    return router
}

export default userRouter;
      
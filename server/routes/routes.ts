import { Application } from "express";
import userRouter from "./user";
import adminRoutes from "./admin";




const routes =(app:Application)=>{

    app.use('/api/user',userRouter()),
    app.use('/api/admin',adminRoutes())

}

export default routes;
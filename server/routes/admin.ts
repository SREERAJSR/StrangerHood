import { Router } from "express";
import { loginAdmin } from "../controller/admin_controller";

 const adminRoutes=():Router=>{
    const router:Router = Router();
    router.post('/login',loginAdmin)
    
    return router
}


export default adminRoutes;
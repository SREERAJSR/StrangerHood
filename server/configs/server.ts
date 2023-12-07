import { Application } from "express";
import configKeys from "./configs";

const PORT:string | number  = configKeys().PORT || 5000;
 function serverConfig(app:Application){
    
    app.listen(PORT,()=>{
        console.log(`server is connected to port http://localhost:${PORT}`);
        
    })
}

export default serverConfig; 

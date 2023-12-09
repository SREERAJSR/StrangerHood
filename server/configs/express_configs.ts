import express, { Application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const options:{origin:string} = {  
    origin: 'http://localhost:4200',
    }
    

const expressConfig=(app:Application)=>{  

    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())
    app.use(cors(options))

}

export default expressConfig;
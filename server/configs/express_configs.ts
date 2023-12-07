import express, { Application } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


const expressConfig=(app:Application)=>{

    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser())

}

export default expressConfig;
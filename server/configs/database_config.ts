import mongoose from 'mongoose';
import configKeys from './configs';

const MONGODB_URL = configKeys().MONGODB_URL;


  
const databaseConfig= async()=>{

    try{
        await mongoose.connect(MONGODB_URL,{dbName:configKeys().DB_NAME});

        console.log('database connected')

    }catch(err){
        console.log('database connection error'+ err)
        process.exit(1);
    }
}

export default databaseConfig
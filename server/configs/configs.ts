import dotenv from 'dotenv';
dotenv.config();


const configKeys=()=>{
    return{
        PORT:process.env.PORT as string,
        MONGODB_URL:process.env.MONGODB_URL as string,
        DB_NAME :process.env.DB_NAME as string,
        ACCESSTOKEN_SECRET_KEY: process.env.ACCESSTOKEN_SECRET_KEY as string,
        TWILIO_SID:process.env.TWILIO_SID as string,
        TWILIO_AUTHTOKEN:process.env.TWILIO_AUTHTOKEN as string,
        TWILIO_VERIFY_SID:process.env.TWILIO_VERIFY_SID  as string,
        EMAIL:process.env.EMAIL as string,
        PASS_KEY:process.env.PASS_KEY as string,
        LIVE_URL:process.env.LIVE_URL as string
    }
}

export default configKeys;
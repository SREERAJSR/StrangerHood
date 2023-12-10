import mongoose,{Schema} from 'mongoose';
import { userDbStructure } from '../types/user_interface';
import { Timestamp } from 'mongodb';


const userSchema = new  Schema<userDbStructure>({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
            default: () => Date.now(), // Use a function to set the default value to current date

    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean
    }
})

const User =mongoose.model<userDbStructure>('User',userSchema)

export default User;
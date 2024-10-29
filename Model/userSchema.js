import mongoose from "mongoose";

 const userSchemas=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
       type:String,
    },
    is_blocked:{
        type:Boolean,
        default:false

    }
})

export const userSchema = mongoose.model('users',userSchemas)

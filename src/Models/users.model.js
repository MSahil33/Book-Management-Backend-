import mongoose,{Schema} from "mongoose";


// User Schema
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        required: true,
        trim: true, // Remove leading and trailing spaces from the username
        index: true, // Index can be used while searching
    },
    fullName:{
        type:String,
        required:true,
        trim:true // Remove leading and trailing spaces
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true // Remove leading and trailing spaces
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

export const User = new mongoose.model("User",userSchema); 
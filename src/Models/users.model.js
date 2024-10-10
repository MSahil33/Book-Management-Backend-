import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        required: true,
        trim: true, // Remove leading and trailing spaces from the username
        index: true, // Index can be used while searching
    },
    fullName: {
        type: String,
        required: true,
        trim: true // Remove leading and trailing spaces
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true // Remove leading and trailing spaces
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "India"
    }
}, { timestamps: true });

// Middleware to hash the password before saving the user document using the bcrypt
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

// Creating a middleware to check whether the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Creating a function to generate a JWT token 
userSchema.methods.generateToken = function () {
    return jwt.sign(
        //payload data
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.TOKEN_SECRET, // token secret key
        {
            expiresIn: process.env.TOKEN_EXPIRY, // TOKEN EXPIRY i,e 1 day
        }
    );
}

// Export the User model
export const User = new mongoose.model("User", userSchema); 
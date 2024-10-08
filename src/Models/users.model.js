import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

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

// Export the User model
export const User = new mongoose.model("User", userSchema); 
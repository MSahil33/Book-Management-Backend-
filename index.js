import dotenv from 'dotenv';
import connectDB from './src/Db/index.db.js';


console.log("hello world");

// // Configuring .env file  
dotenv.config({
    path:'./.env'
})

// // Connecting database
connectDB();

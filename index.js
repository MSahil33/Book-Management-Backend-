import dotenv from 'dotenv';
import connectDB from './src/Db/index.db.js';
import { app } from './src/app.js';

// // Configuring .env file  
dotenv.config({
    path: './.env'
})

// Connecting database
connectDB()
    .then(() => {
        app.get("/", (req, res) => {
            res.send("Server started successfully!");
        });

        app.listen(process.env.PORT || 8005, () => {
            console.log("Server listening at Port :", process.env.PORT);
        });

    }).catch((error) => {
        console.log("Database connection failed : ", error);
        process.exit(0);
    });
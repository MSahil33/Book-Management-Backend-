import mongoose from 'mongoose';
import DB_NAME from '../constants.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.LOCAL_MONGODB_URL}/${DB_NAME}`);
        console.log(`Database url : ${process.env.LOCAL_MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console.log("Database connection error : ", error);
        process.exit(0);
    }
}

export default connectDB;
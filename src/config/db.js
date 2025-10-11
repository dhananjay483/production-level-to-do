// here we connect our database (mongodb)
import mongoose from "mongoose";
import dotenv from 'dotenv';

// load environmental variable
dotenv.config();

// connect mongodb
const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully ✅✅✅`);
    } catch (error) {
        console.log(`database connection error, ${error.message}`);   
    }
}
export default connectDB;
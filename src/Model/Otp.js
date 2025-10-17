// here we define our otp model details
import mongoose from "mongoose";

// define our otp model 
const optSchema = new mongoose.Schema(
    {
    email : {
        type : String,
        required : true
    },
    otp:{
        type : String,
        required : true
    },
},
    {
        timestamps : true,
    },
);
const OTP = mongoose.model('OTP',optSchema);
export default OTP;
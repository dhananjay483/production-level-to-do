import User from '../Model/User.js';
import bcrypt from 'bcrypt';
import TokenGenerator from '../utility/TokenGenerator.js';
import OTP from '../Model/Otp.js';

// her we define our logic for every new user register and login and update user and also otp verification
// when user login then generate an accessToken and refreshToken 

export default class userOperations {
    // Account creation
    createUser = async(req , res , next) =>{
      try {
          //fetch all the required details for the account creation
        const {username , email , password , role , otp} = req.body;
        // check if user alreday exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message : "User Already Exist",
                success : false
            });
        }
        let isVerified = false; // otp verification flag
        
        // next check otp validity via email
        const otpResponse = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        if(otpResponse.length === 0){
            return res.status(400).json({
                message : "Otp Not found",
                success : false
            }); 
        }
         console.log(otpResponse);
        // if otp found
        const latestOtp = otpResponse[0].otp; // extract the actual otp number
        // validate that OTP which will enters user
        if(otp !== latestOtp){
            return res.status(400).json({
                message : "Invalid OTP",
                success : false
            });
        }
        isVerified = true; // if the enter otp is valid
        // After otp verification register a new user
        const hashedpassword = await bcrypt.hash(password,10); // encrypt password before save user
        // create a new user
        const newUser = await User.create({
            username,
            email,
            password : hashedpassword,
            role,
            isVerified
        });
        res.status(201).json({
            message : "User Registered Successful",
            success : true,
            newUser
        });
      } catch (error) {
        console.log(`Failed to register new user ${error.mesage}`);
        next(error);
      }

    }
    // here 
}
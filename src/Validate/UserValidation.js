import {authSignupUserSchema , authLoginUserSchema, updatePasswordSchema} from '../Schema/UserSchema.js';
import bcrypt from 'bcrypt'; // store hash format of password
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
export default class userValidations {
    // validation for signup a new user
    validateSignupRequest = async(req,res,next) => {
        try {
            // check register role user / admin
            if(req.headers.role === 'admin'){
                req.body.role = req.headers.role;
            } else{
                req.body.role = 'user';
            }
            req.body.password = await bcrypt.hash(req.body.password, 10); // i want to has my password

            const validUser = await authSignupUserSchema.validate(req.body,{
                abortEarly: false,
                stripUnknown: true,
            })
            console.log('User SignUp Validation successful✅✅' ,validUser);4
            next();
        } catch (error) {
            console.log(`User Register validation error ${error.message}`);
            next(error);
        }
    };
    // validation for user login
    validateLoginRequest = async(req,res,next) => {
        try {
             const validUser = await authLoginUserSchema.validate(req.body,{
                abortEarly: false,
                stripUnknown: true,
            })
            console.log('User Login Validation successful✅✅' ,validUser);4
            next();
        } catch (error) {
            console.log(`Failed to user login validation${error.message}`);
            next(error);
        }
    };
    validateResetPasswordRequest = async(req,res,next) => {
       try {
       const { email, otp, newPassword } = req.body;

        // Check required fields
        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "Email, OTP, and new password are required",
                success: false
            });
        }
       // update password
       const updatePassword = await updatePasswordSchema.validate(req.body,{
        abortEarly : false,
        stripUnknown : true
       }) 
       console.log('Change password successful✅✅', updatePassword);
       next();

       } catch (error) {
        console.log(`Failed to validate update password ${error.message}`);
        next(error);
       }
    };
    // validate access token
    validateUser = async(req,res,next) => {
        try {
            
            // get token from header
            const authorization = req.headers.authorization;
            if(!authorization) {
                throw new Error('No Authorization header found');
            }
            const accessToken = authorization.split(" ")[1]; // get token and check
            const payload = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET); // verify the payload information
            req.userId = payload.id; // req that user which will we access
            next();
        } catch (error) {
            console.log(`invalid or expired access token ${error.message}`);
            next(error);
        }
    }
    // validate refresh token
    validateRefreshToken = async(req,res,next) =>{
        // get the token from headers
        try {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
            // get token from header
          const token = req.body.refreshToken;
          if(!token){
            return res.status(400).json({
                message : "No Token Provided",
                success : false
            });
          }
          // if token have provide then verify token payload
          jwt.verify(token , refreshTokenSecret , (err,decoded) =>{
            if(err){
                return res.status(400).json({
                    message : "Invalid Token",
                    success : false
                });
            }
            req.user = decoded;
            next();
          })
        } catch (error) {
            console.log(`invalid or expired REFRESH token ${error.message}`);
            next(error);
        }
    }
}
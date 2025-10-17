import {authSignupUserSchema , authLoginUserSchema, updatePasswordSchema} from '../Model/User.js';
import bcrypt from 'bcrypt'; // store hash format of password
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
        // password hashing
       req.body.password = await bcrypt.hash(req.body.password, 10);
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
}
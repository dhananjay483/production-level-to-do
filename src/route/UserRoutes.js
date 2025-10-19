import express from 'express';
import userOperations from '../controller/UserController.js';
import userValidations from '../Validate/UserValidation.js';
import sendOtp from '../controller/otpController.js';

const router = express.Router();

const userAuthOperations = new userOperations();
const userAuthValidations = new userValidations();

router.post('/signup' , userAuthValidations.validateSignupRequest,
    userAuthOperations.createUser
); // user registration
router.post('/login' , userAuthValidations.validateLoginRequest,
    userAuthOperations.logInUser
); // user login
router.post('/otp' , sendOtp); // for otp generate

router.put('/reset', userAuthValidations.validateResetPasswordRequest,
    userAuthOperations.updatePassword
); // for reset password

router.get('/user/:id' , userAuthValidations.validateUser ,
    userAuthOperations.getUser); // get user details

router.post('/refreshToken' , userAuthValidations.validateRefreshToken,
    userAuthOperations.refreshToken
);

export default router;
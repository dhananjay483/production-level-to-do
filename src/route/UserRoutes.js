import express from 'express';
import userOperations from '../controller/UserController.js';
import userValidations from '../Validate/UserValidation.js';
import sendOtp from '../controller/otpController.js';

const router = express.Router();

const userAuthOperations = new userOperations();
const userAuthValidations = new userValidations();
router.post('/signup' , userAuthValidations.validateSignupRequest,
    userAuthOperations.createUser
);
router.post('/login' , userAuthValidations.validateLoginRequest,
    userAuthOperations.logInUser
);
router.post('/otp' , sendOtp);
export default router;
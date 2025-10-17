// here i want to add our validation for user model 
import yup from 'yup';

// here user register and verify through otp sending
export const authSignupUserSchema = yup.object({

    username : yup
    .string('User name must be string type')
    .trim()
    .min(3,'At-least username must be 6 character')
    .required('username is required'),

    email : yup
    .string('email should be a string type')
    .required('email is required for every authentication'),

    password : yup 
    .string('password should be a string type')
    .min(8,'password length must be 8 character')
    .required('password is must required'),

    role : yup
    .string('role is string type!!')
    .oneOf(['user','admin'], 'provide your role')
    .required('role is required'),

    otp : yup 
    .string('otp type is string'),

    isVerified : yup
    .string('type should be string')

});

export const authLoginUserSchema = yup.object({

    email : yup 
     .string('email should be a string type')
    .required('please write your registered eamil'),

    password : yup 
    .string('password should be a string type')
    .min(8,'password length must be 8 character')
    .required('please write a password which is register password'),

});

// when you want to update password through otp verification
export const updatePasswordSchema = yup.object({
    
     email : yup 
     .string('email should be a string type')
    .required('please write your registered eamil'),

    password : yup 
    .string('password should be a string type')
    .min(8,'password length must be 8 character')
    .required('please write a password which is register password'),

    otp : yup 
    .string('otp type is string'),

});
// here i want to add our validation for user model 
import yup from 'yup';

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
    .required('role is required')
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

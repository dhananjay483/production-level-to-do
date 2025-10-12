// here we validate our define datbase model or validate our schema
import *as yup from 'yup';

// validate our defined schema model 
export const createTaskSchema = yup.object({
    title : yup
    .string('Title should on string!!')
    .trim()
    .min(3, 'Title is required at-least 3 character')
    .required('Title is required'),

    isImportant : yup
    .string()
    .oneOf(['Low','Medium','High'] , 'please select your task importance')
    .default('Low'),

    isCompleted : yup
    .boolean()
    .default(false)
});

export const updateTaskSchema = yup.object({
    title : yup
    .string('Title should be an string')
    .trim()
    .min(3, 'Title is required at-least 3 character')
    .required('Title is required'),

    isImportant : yup
    .string()
    .oneOf(['Low','Medium','High'] , 'Please select you task importance!'),

    isCompleted : yup
    .boolean()
    // .min(1 , 'At-least you should provide during update')
})

export const searchTaskSchema = yup.object({
     title : yup
    .string('Title should be an string')
    .trim()
    .min(3, 'Title is required at-least 3 character')
    .required('Title is required'),
});
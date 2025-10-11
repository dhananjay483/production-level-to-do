/* Here we write our validation for create todo , update todo , search todo*/
import { createTaskSchema, updateTaskSchema, searchTaskSchema } from '../Schema/ToDoSchema.js';

export default class todoValidations {
    // here we write create task validation
    validateCreateRequest = async (req,res,next) => {
        try {
            const validTodo = await createTaskSchema.validate(req.body,{
                abortEarly : false, // it instructs the validator to continue checking all defined rules for a piece of data
                stripUnknown : true  // remove the un-used property or data that is not defined my schema
            })
            console.log('create todo validation successfully done', validTodo);
            next();
        } catch (err) {
            console.log('Create todo task validation error', err);
            next(err);
        }
    }
    validateupdateRequest = async (req,res,next) => {
        try {
            const validTodo = await updateTaskSchema.validate(req.body,{
                abortEarly : false, // it instructs the validator to continue checking all defined rules for a piece of data
                stripUnknown : true  // remove the un-used property or data that is not defined my schema
            })
            console.log('update todo validation successfully done', validTodo);
            next();
        } catch (err) {
            console.log('update todo task validation error', err);
            next(err);
        }
    }
    validateSearchRequest = async (req,res,next) => {
        try {
            const validTodo = await searchTaskSchema.validate(req.body,{
                abortEarly : false, // it instructs the validator to continue checking all defined rules for a piece of data
                stripUnknown : true  // remove the un-used property or data that is not defined my schema
            })
            console.log('create todo validation successfully done', validTodo);
            next();
        } catch (err) {
            console.log('Create to task validation error', err);
            next(err);
        }
    }
}
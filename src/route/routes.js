import express from "express";
import todoValidations from '../Validate/validate.js';
import ToDoOperations from '../controller/todoController.js'


const router = express.Router();

const todoRequestValidation = new todoValidations();  // for validation
const todoRequestOperatins = new ToDoOperations(); // for controller functionality

router.get('/tasks',todoRequestOperatins.getAllTodos); // here validation and getAllTodos 

router.get('/tasks/:id' , todoRequestOperatins.getTodosById); // get all todos by id

router.post('/tasks',todoRequestValidation.validateCreateRequest,
    todoRequestOperatins.createTodo
); // here post my todo task and as well as validation

router.put('/tasks',todoRequestValidation.validateupdateRequest,
    todoRequestOperatins.updateTodo
); // here i want to update my existing todo and also check my validation

router.delete('/tasks/:id' , todoRequestOperatins.deleteTodos ); // delete that todo which id will have

router.delete('/tasks' , todoRequestOperatins.deleteAllTodos ); // delete all the existing todo

export default router; 

// http://localhost:4000/api/todos/ -----> Base Routes
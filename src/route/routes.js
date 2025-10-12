import express from "express";
import todoValidations from '../Validate/validate.js';
import ToDoOperations from '../controller/todoController.js'


const router = express.Router();

const todoRequestValidation = new todoValidations();
const todoRequestOperatins = new ToDoOperations();

router.get('/tasks',todoRequestOperatins.getAllTodos);
router.post('/tasks',todoRequestValidation.validateCreateRequest,
    todoRequestOperatins.createTodo
);
export default router; 

// http://localhost:4000/api/todos/ -----> Base Routes
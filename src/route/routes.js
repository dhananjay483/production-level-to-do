import express from "express";
import  {getTodos,addTodos , updateTodos, deleteTodos, getTodosById} from "../controller/todoController.js";

const router = express.Router();

router.get('/',getTodos); // get all the task from db.json{}
router.get('/:id',getTodosById); // get  the task by id from db.json{}
router.post("/", addTodos); // post a new to do list
router.put("/:id", updateTodos); // update your existing to do
router.delete("/:id",deleteTodos); // delete your to do list
export default router; 

// http://localhost:4000/api/todos/ -----> Base Routes
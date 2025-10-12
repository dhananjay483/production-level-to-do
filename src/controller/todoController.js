// import fs from 'fs';
// import path  from 'path';
// import { fileURLToPath } from 'url';
// import crypto from 'crypto';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // path to db.json
// const db_path = path.join(__dirname , '../..' , "db.json");
// console.log(db_path);

// // Read db.json
// function readDB (){
//     try {
//         const data = fs.readFileSync(db_path , "utf-8");
//         return JSON.parse(data);
//     } catch (err) {
//         console.log("Error reading in db.json");
//         return {todos:[] , err};
//     }
// }
// //write db.json
// function writeDB(data){
//   try{
//       fs.writeFileSync(db_path,JSON.stringify(data,null,2),"utf-8"); // save the file in javascript object
//       console.log("data base update successfully...");
//   }
//     catch(err){
//         console.error("Error writing in db.json",err);
//     }
// }

// // get all the task
// export const getTodos = (req,res)=>{
//     const db = readDB(); // load from db.json()
//     // res.json({
//     //     message : "Data Fetched Successfully!",
//     //     todos : db.todos,
//     // });
//     res.json(db.todos || []);
// }

// // to do find by id
// export const getTodosById = (req,res) =>{
//     const db = readDB();
//     const {id} = req.params;
//     const todo = db.todos.find((t)=> t.id ===id); // check if any id will match or not
//     if(!todo){
//         return res.status(403).json({message : "Id Not Found"});
//     }

//      res.json({
//         message : "Data Fetched By Id Successfully!",
//        todo : todo
//     });
// }
// // add new todo list
// export const addTodos = (req,res)=>{
//     const db = readDB();
//     const {title , isImportant} = req.body;
//     if(!title){
//         return res.status(404).json({message:"Title is required"});
//     }
//     if(!isImportant){
//         return res.status(403).json({message:"IsImportant is required!"});
//     }
//     const now = new Date().toLocaleString();
//     // new todo create
//     const newTodo = {
//         id: crypto.randomUUID(), // using it for genarate random id
//         title,
//         isImportant : isImportant || 'Low',
//         isCompleted : false,
//         createdAt : now,
//         updatedAt : now,
//     };
//     db.todos.push(newTodo); // push my new to-do data into my existing database
//     writeDB(db); // save updated data into database --> db.json()

//     // res.status(202).json({
//     //     message:"TO-DO-Item Added Successfully",
//     //     success : true,
//     //     newTodo
//     // });
//      res.status(201).json(newTodo);
// };

// // Update the to-do application --->
// // export const updateTodos = (req,res) =>{
// //     // load the data from db.json();
// //     const db = readDB();
// //     const {id} = req.params; // req the todo id which could be update
// //     const {title , isImportant , isCompleted} = req.body; // fetch details
// //     // if details will not have
// //     if(!title){
// //         return res.status(401).json({message : "Title is required", success : false})
// //     }
// //     if(!isImportant){
// //         return res.status(401).json({message : "IsImportant is required", success : false})
// //     }
// //     if(!isCompleted){
// //         return res.status(401).json({message : "isCompleted is required", success : false})
// //     }

// //     // all details fetch done then only
// //     const todo = db.todos.find(t => t.id ===id); // check if any id will match or not
// //     if(!todo){
// //         return res.status(404).json({message:"To-Do Not Found" , success : false});
// //     }
// //     // add all fields
// //     if(title !== undefined) todo.title = title;
// //     if(isImportant !== undefined) todo.isImportant = isImportant;
// //     if(isCompleted !== undefined) todo.isCompleted = isCompleted;
// //     // update date
// //     todo.updatedAt = new Date().toLocaleString();
// //     writeDB(db); // save the updated data into db.json()
// //     // res.status(202).json({
// //     //     message : "TO-DO updated Successfully ",
// //     //     success : true,
// //     //     todo
// //     // });
// //     res.status(200).json(todo);
// // };

// // update to do
// export const updateTodos = (req, res) => {
//   const db = readDB();
//   const { id } = req.params;
//   const { title, isImportant, isCompleted } = req.body;

//   const todo = db.todos.find(t => t.id === id);
//   if (!todo) return res.status(404).json({ message: "Todo Id not found" });

//   if (title !== undefined) todo.title = title;
//   if (isImportant !== undefined) todo.isImportant = isImportant;
//   if (isCompleted !== undefined) todo.isCompleted = isCompleted;

//   todo.updatedAt = new Date().toLocaleString();
//   writeDB(db);

//   res.status(200).json(todo); // return JSON
// };
// // delete to do
// export const deleteTodos = (req,res) =>{
//     const db = readDB(); // load the data from db.json()
//     const {id} = req.params;
//     const index = db.todos.findIndex(t => t.id === id);
//     if(index === -1){
//         return res.status(402)
//         .json({
//             message : "ID Not Found"
//         });
//     }
//     // if id found
//     const deleted = db.todos.splice(index,1)[0]; // deleted first element of the todo array
//     writeDB(db); // save updated data to the db.json file

//      res.status(202).json({
//         message : "TO-DO Deleted Successfully",
//         success : true,
//         deleted
//     });
// };

/* update my To Do controller where i define my to do functionality --> */

import Task from '../Model/ToDo.js'

export default class ToDoOperations {
  // here i write my get all to do task
  getAllTodos = async (req, res, next) => {
    try {
      const allTodos = await Task.find({}) // fetch all to do task
      res.status(201).json({
        message: 'ToDo Fetched Successful✅✅',
        allTodos,
      })
    } catch (err) {
      console.log(`Failed to fetch to do data ${err}`)
      next(err)
    }
  }
  /* Here we want to get to do through id*/
  getTodosById = async(req,res,next) => {
    try {
        const id = req.params.id;
    if(!id){
        return res.status(400).json({message : "id is required",success:false})
    }
    const todo = await Task.findById(id);
    if(!todo){
        return res.status(404).json({message : "To Do Task Not Found!!",success:false})
    }
    res.status(202).json({message : "Data Fetched By Id Successfully✅✅",success : true,  todo:todo});
    } catch (error) {
        console.log(`Failed to fetch to do through id ${error.message}`);
        next(error);
    }
  }
  /* Here i want to write my create todo functionality*/
  createTodo = async (req, res, next) => {
    try {
      const newTodo = req.body // fetch to do details from body
      const todo = await Task.create(newTodo)
      console.log(todo)
      res.status(201).json({
        message: 'To Do Created Successfully✅✅',
        todo,
      })
    } catch (err) {
      console.log(`Todo Created failed , try again ${err}`)
      next(err)
    }
  }
  /* Here i want update my todo task */
  updateTodo = async (req, res, next) => {
    try {
      // we need an and edittodo details during updating time
      const edittodo = req.body
      const id = req.body.id
      if (!id) {
        return res.status(400).json({ message: 'Task Id is Required' })
      }
      // find and update my todo task
      const updateTask = await Task.findByIdAndUpdate(
        id,
        edittodo,
        { new: true, runValidators: true } // return the new updated document
        // mongoose schema validators run even after update
      )
      if (!updateTask) {
        return res.status(400).json({
          message: 'Task Not Found!!',
        })
      }
      res.status(202).json({
        message: 'To Do Update Successful✅✅',
        task: updateTask,
      })
    } catch (err) {
      console.log(`Failed to update your todo task ! try again ${err.message}`)
      next(err)
    }
  }
  /* Here I want to delete my to do task through id */
  deleteTodos = async (req, res, next) => {
    try {
      // i want to fetch id from my body
      const id  = req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'Id is Required' })
      }
      const deleteTask = await Task.findByIdAndDelete(id)
      if (!deleteTask) {
        return res.status(404).json({ message: 'Task Not Found' })
      }
      res
        .status(200)
        .json({ message: 'To Do Deleted Successful ✅✅', success: true })
    } catch (err) {
      console.log('Failed to delete todo ${err.message}')
      next(err)
    }
  }
  /* Here i want to delete all the listed to do task*/
  deleteAllTodos = async (req, res, next) => {
    try {
      // delete all to do
      const allTodos = await Task.deleteMany({})
      res.status(202).json({
        message: 'All TO Do Deleted Successful',
        todo: allTodos,
      })
    } catch (error) {
      console.log(`Failed to delete all to do task ${error.message}`)
      next(error)
    }
  }
}

import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// path to db.json 
const db_path = path.join(__dirname , '../..' , "db.json");
console.log(db_path);

// Read db.json
function readDB (){
    try {
        const data = fs.readFileSync(db_path , "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log("Error reading in db.json");
        return {todos:[] , err};
    }
}
//write db.json
function writeDB(data){
  try{
      fs.writeFileSync(db_path,JSON.stringify(data,null,2),"utf-8");
      console.log("data base update successfully...");
  }
    catch(err){
        console.error("Error writing in db.json",err);
    }
}

// get all the task
export const getTodos = (req,res)=>{
    const db = readDB(); // load from db.json()
    res.json({
        message : "Data Fetched Successfully!",
        todos : db.todos,
    });
}

// to do find by id
export const getTodosById = (req,res) =>{
    const db = readDB();
    const {id} = req.params;
    const todo = db.todos.find((t)=> t.id ===id); // check if any id will match or not
    if(!todo){
        return res.status(403).json({message : "Id Not Found"});
    }

     res.json({
        message : "Data Fetched By Id Successfully!",
       todo : todo
    });
}
// add new todo list
export const addTodos = (req,res)=>{
    const db = readDB();
    const {title , isImportant} = req.body;
    if(!title){
        return res.status(404).json({message:"Title is required"});
    }
    const now = new Date().toLocaleString();
    // new todo create
    const newTodo = {
        id: crypto.randomUUID(), // using it for genarate random id
        title,
        isImportant : isImportant || 'Low',
        isCompleted : false,
        createdAt : now,
        updatedAt : now,
    };
    db.todos.push(newTodo); // push my new to-do data into my existing database
    writeDB(db); // save updated data into database --> db.json()

    res.status(202).json({
        message:"TO-DO-Item Added Successfully",
        success : true,
        newTodo
    });
};

// Update the to-do application ---> 
export const updateTodos = (req,res) =>{
    // load the data from db.json();
    const db = readDB();
    const {id} = req.params; // req the todo id which could be update 
    const {title , isImportant , isCompleted} = req.body; // fetch details
    // if details will not have
    if(!title){
        return res.status(401).json({message : "Title is required", success : false})
    }
    if(!isImportant){
        return res.status(401).json({message : "IsImportant is required", success : false})
    }
    if(!isCompleted){
        return res.status(401).json({message : "isCompleted is required", success : false})
    }
    
    // all details fetch done then only 
    const todo = db.todos.find(t => t.id ===id); // check if any id will match or not
    if(!todo){
        return res.status(404).json({message:"To-Do Not Found" , success : false});
    }
    // add all fields
    if(title !== undefined) todo.title = title;
    if(isImportant !== undefined) todo.isImportant = isImportant;
    if(isCompleted !== undefined) todo.isCompleted = isCompleted;
    // update date
    todo.updatedAt = new Date().toLocaleString();
    writeDB(db); // save the updated data into db.json()
    res.status(202).json({
        message : "TO-DO updated Successfully ",
        success : true,
        todo
    });
};

// delete to do
export const deleteTodos = (req,res) =>{
    const db = readDB(); // load the data from db.json()
    const {id} = req.params;
    const index = db.todos.findIndex(t => t.id === id);
    if(index === -1){
        return res.status(402)
        .json({
            message : "ID Not Found"
        });
    }
    // if id found
    const deleted = db.todos.splice(index,1)[0];
    writeDB(db); //save updated data from db.json

     res.status(202).json({
        message : "TO-DO Deleted Successfully",
        success : true,
        deleted
    });
};
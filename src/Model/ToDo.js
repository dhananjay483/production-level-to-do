// here we define our mongoDB model for 
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type : string,
        required : true,
        trim : true
    },
    isCompleted : {
        type : Boolean,
        default: false,
    },
    isImportant : {
        type : Boolean,
        enum : ['Low','Medium','High'],
        default : 'Low',
    },
    {timestamps : true},
})
const Task = mongoose.model('Task',todoSchema);
export default Task;
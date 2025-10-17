import mongoose from "mongoose";
 
// Here we define our user model
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : [true,'Provide a password'],
        minlength : 8
    },
    role : {
        type : String,
        required : true,
        enum : ['user','admin']
    },
    // otp : {
    //     type : String
    // },
    // isVerified : {
    //     type : Boolean,
    //     default : false
    // },
    timestamps : true
});
const User = mongoose.model('User',userSchema);
export default User;
// here we send our otp through mail id
// we write the logic from otp mailSender

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// here we receive information  otp via mail 
const mailSender = async(email , title , body) => {
    // create transporter 
    // without transporter nodemailer does not know where and how to send mail and connect to the mail server that's why transpoter
    const transporter = nodemailer.createTransport({
        service : 'Gmail', // which email service you used like(outlook , gmail,yahoo..)
        auth : { // how you authenticate
            user : process.env.EMAIL,
            pass : process.env.PASSWORD
        }
    });
    const mailOptions = {
        from : process.env.EMAIL,
        to : email,
        subject : title,
        html : body
    }
    console.log(mailOptions);
   transporter.sendMail(mailOptions , (err,info)=>{
     if(err){
        console.log(err);
     } else{
        console.log(`Email Sent : ${info.response}`);
     }
   })
    
}
export default mailSender;
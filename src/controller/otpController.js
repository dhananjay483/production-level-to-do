// here we generate our otp for every time when a new user register or changing existing password
// otp will sending to your mail account
// here we fetch our mail id and store our otp

// Here the step otp verification/generator or send otp into your mail 
/*
1	Generate OTP using otp-generator
2	Store OTP in MongoDB with expiration time
3	Send OTP via email using Nodemailer
4	Verify OTP later (check email + OTP match and not expired)
 */
import OTP from '../Model/Otp.js';
import otpGenerator from 'otp-generator';
import  mailSender from  '../utility/mailSender.js'; // for mailsender we use nodemailer

export default async function sendOtp(req , res , next){
    try {
        // fetch you email from body
        const email = req.body.email;
        // generate our otp 
        const otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        });
        // save our otp into database
        const otppayload = {email , otp};
        const otpBody = await OTP.create(otppayload);
        otpBody.save(); // database save

        // send otp via email
        const mailRespose = await mailSender(
            email, // in which mail id
            'Verification Email',
           `<h3>Confirm Email</h3>
            <p>Here is your OTP : ${otp}</p>`
        );
        console.log(`Mail Response : ${mailRespose}`);

        // response status
        res.status(201).json({
            message : 'OTP sent successfully✅✅',
            success : true,
             otpBody
        });
        next();

    } catch (error) {
        console.log(`Failed to send otp , please try again ${error.message}`);
        next(error);
    }
}

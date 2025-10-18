import User from '../Model/User.js';
import bcrypt from 'bcrypt';
import TokenGenerator from '../utility/TokenGenerator.js';
import OTP from '../Model/Otp.js';

// her we define our logic for every new user register and login and update user and also otp verification
// when user login then generate an accessToken and refreshToken 

export default class userOperations {
    // Account creation
    createUser = async (req, res, next) => {
        try {
            //fetch all the required details for the account creation
            const { username, email, password, role, otp } = req.body;
            // check if user alreday exist or not
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "User Already Exist",
                    success: false
                });
            }
            let isVerified = false; // otp verification flag

            // next check otp validity via email
            const otpResponse = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
            if (otpResponse.length === 0) {
                return res.status(400).json({
                    message: "Otp Not found",
                    success: false
                });
            }
            console.log(otpResponse);
            // if otp found
            const latestOtp = otpResponse[0].otp; // extract the actual otp number
            // validate that OTP which will enters user
            if (otp !== latestOtp) {
                return res.status(400).json({
                    message: "Invalid OTP",
                    success: false
                });
            }
            isVerified = true; // if the enter otp is valid
            // After otp verification register a new user
            const hashedpassword = await bcrypt.hash(password, 10); // encrypt password before save user
            // create a new user
            const newUser = await User.create({
                username,
                email,
                password: hashedpassword,
                role,
                isVerified
            });
            res.status(201).json({
            success: true,
            message: isVerified
          ? 'User Successfully Registered and Verified'
          : 'User Registered verification pending',
        user: newUser,
      });
        } catch (error) {
            console.log(`Failed to register new user ${error.mesage}`);
            next(error);
        }

    }
    // here we log in the registered User
    logInUser = async (req, res, next) => {
        try {
            const { email, password } = req.body; // fetch the login details
            const user = await User.findOne({ email }); // find user by mail id
            if (!user) {
                return res.status(400).json({
                    message: "User Not Found!!",
                    success: false
                });
            }
            
            // if valid user generate token
            const tokenGenerator = new TokenGenerator();
            const accessToken = tokenGenerator.accessTokenGenerator(user._id);
            const refreshToken = tokenGenerator.refreshTokenGenerator(user._id);

            /* after successfully login complete then only */
            res.status(200).json({
            message: "Login Successfully ✅✅",
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });

        } catch (error) {
            console.log(`Failed to login ! please check your details ${error.mesage}`);
            next(error);
        }
    }
    // here i want get the user details
    getUser = async(req,res,next) => {
       try {
         // fetch the user is
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message : "User Not Found",
                success : false
            });
        }
        res.status(201).json({
            mesage : "User Details Fetched Successfully",
            success : true,
            user
        });
       } catch (error) {
        console.log(`Failed to fetch user details ${error.mesage}`);
        next(error);
       }
    }
    // here i want to update my password
    updatePassword = async(req,res,next) => {
        // fetched the user details during update password
        const {email , otp , newPassword} = req.body;
        if(!email){
            return res.status(400).json({
                message : "User Not Found",
                success : false
            });
        }
        // verify and get most recent sending otp via email
        const otpResponse = await OTP.findByIdAndUpdate({email}).sort({createdAt : -1}).limit(1);
        console.log(`Getting otp response ${otpResponse}`);
        // check the latest otp with store db otp
        if(otpResponse.length === 0 || otp !== otpResponse[0].otp){
            return res.status(400).json({
                message : "Invalid otp ! please try again",
                success : false
            });
        }
        // if otp match then update my password
        const hashedpassword = await bcrypt.hash(newPassword , 10); // store into hash format
        console.log(hashedpassword);
        // update password and store new password and also update user
        const updateUser = await User.findOneAndUpdate(
            {email},
            {password : hashedpassword},
            {new : true}
        );
        res.status(201).json({
            message : "Password Update Successful",
            success : true,
            user : updateUser
        })
    }
}
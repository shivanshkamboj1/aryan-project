const User = require("../models/User")
const ResetPassToken = require("../models/ResetToken")
const Otp = require("../models/Otp")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const {mailSender} = require("../utils/mailsender");
const otpGenerator = require('otp-generator');
const redisClient = require('../config/redis')


exports.signup = async(req,res)=>{
    try {
        const {firstName,lastName,emailId,password}=req.body;
        if(!firstName||!lastName||!emailId||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }
        if(password.length<8){
                return res.status(422).json({
                success:false,
                message:"Password must have more than 8 charactern"
            })
        }
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User with this email already exists",
        });
        }
        // const otp = otpGenerator.generate(6, { 
        //     upperCaseAlphabets: false,
        //     specialChars: false,
        //     alphabets: false 
        // });
        // const createOtp = await Otp.create({
        //     emailId,otp,expiresIn:Date.now()+3600000
        // })
        const user = await User.create({firstName,lastName,emailId,password});
        user.password = undefined;
        const token = jwt.sign({ id: user._id, emailId: user.emailId,membershipType:user.membershipType },process.env.JWT_SECRET,options)
        const options2 = {
            expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("token",token,options2)
        return res.status(200).json({
            success:true,
            message:"Sign up succesfully"
        })
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:"false",
                message:"internal server error",
                error
            })
    }
}
exports.login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
        });
        }

        if (password.length < 8) {
        return res.status(422).json({
            success: false,
            message: "Password must have more than 8 characters",
        });
        }

        // Find user by email
        const user = await User.findOne({ emailId });
        if (!user) {
        return res.status(401).json({
            success: false,
            message: "Please Sign up",
        });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
        }

        user.password = undefined;
        const options ={
            expiresIn: "24h",
        }
        
        const token = jwt.sign({ id: user._id, emailId: user.emailId,membershipType:user.membershipType },process.env.JWT_SECRET,options)

        const options2 = {
            expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("token",token,options2)
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error(error);
            return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error while logging out",
        });
    }
};

exports.verifyOtp = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}
exports.resetPassword = async (req,res) =>{
    try {
        const { tokenId } = req.params;
        const {newPassword}=req.body;
        if (!tokenId) {
            return res.status(400).json({
                success: false,
                message: "Please enter correct token",
            });
        }
        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter new password",
            });
        }
        
        // Find user by email
        const tokenEntry = await ResetPassToken.findOne({ uid:tokenId });
        if (!tokenEntry) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        if(tokenEntry.expiresIn<Date.now()){
            return res.status(401).json({
                success: false,
                message: "Token is expired",
            });
        }
        const check = await User.findByIdAndUpdate(tokenEntry.userId,{password:newPassword});
        if(!check){
            return res.status(400).json({
                success:false,
                message:"cannot change password"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Password updated succesfully"
        });
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        }); 
    }
}
exports.resetPasswordToken = async (req,res) =>{
    try {
        const { emailId } = req.body;
        if (!emailId) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        // Find user by email
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please Sign up",
            });
        }
        await ResetPassToken.deleteMany({ userId: user._id });
        const uid = uuidv4();
        const check=await ResetPassToken.create({userId:user._id,uid,expiresIn: Date.now()+3600000});
        if(!check){
                return res.status(401).json({
                success: false,
                message: "cannot create token",
            });
        }
        // await mailSender(emailId,'Password reset token ',uid);
        return res.status(200).json({
            success: true,
            message: "Reset token generated and sent to your email",uid
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
exports.changePassword = async (req,res) =>{
    try {
        const userId = req.user.userId;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Please login"
            })
        }
        const {password}=req.body;
        if(!password){
            return res.status(400).json({
                success:false,
                message:"Please enter password"
            })
        }
        const update = await User.findByIdAndUpdate(userId,{password});
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
exports.handleGoogleAuth = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}
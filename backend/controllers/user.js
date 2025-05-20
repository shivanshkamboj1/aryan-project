const User = require("../models/User")
require("dotenv").config()
const {uploadContentCloudinary} = require('../utils/contentUploader')

exports.updateProfile = async(req,res)=>{
    try {
        const {firstName,lastName,age,gender,photo,about}=req.body;
        const {profilePic}=req.files;
        const userId = req.user.id;
        let image;
        let obj={};
        if(profilePic){
                image = await uploadContentCloudinary(
                    profilePic,
                    process.env.FOLDER_NAME,
                    1000,
                    1000
                    )
                obj.photoUrl=image.secure_url
        }
        if(firstName){
            obj.firstName=firstName
        }
        if(lastName){
            obj.lastName=lastName
        }
        if(age){
            obj.age=age
        }
        if(gender){
            obj.gender=gender
        }
        if(about){
            obj.about=about
        }
        const user =await User.findByIdAndUpdate(userId,obj,{new:true});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"error occured"
            })

        }
        return res.status(200).json({
            success:true,
            message:"profile updated succesfully"
        })
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"internal server error",
                error
            })
    }
}
exports.getUserDetail = async(req,res)=>{
    try {
        const id = req.user.id;
        const user = await User.findById(id);

        return res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: user,
        })
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"internal server error",
                error
        })
    }
}

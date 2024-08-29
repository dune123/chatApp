const getUserdetails=require('../controllers/registerUser');
const UserModel = require('../models/userModel');
require('dotenv').config()

const updateUser=async(req,res,next)=>{
    try {
        const user=getUserdetails()

        const {name,profile_pic}=req.body;

        const updateUser=await UserModel.updateOne({_id:user._id},{
            name,
            profile_pic
        })
        
        const userInfo=await UserModel.findById(user._id)

        return res.status(201).json({
            message : "user update successfully",
            data : userInfomation,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = {updateUser}
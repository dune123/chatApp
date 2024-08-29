const UserModel=require('../models/userModel')
require('dotenv').config()

const checkEmail=async(req,res,next)=>{
    try {
        const {email}= req.body;

        const checkEmail=await UserModel.findOne({email}).select("-password")

        if(!checkEmail){
            return res.status(404).json({
                message:'user not found',
                error:true
            })
        }
        
        return res.status(200).json({
            message:"email verify",
            success:true,
            data:checkEmail
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports={checkEmail}
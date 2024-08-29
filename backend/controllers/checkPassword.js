const UserModel=require('../models/userModel')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const checkPassword=async(req,res,next)=>{
    try {
        const {password,userId}=req.body;

        const user=await UserModel.findById(userId)

        const verifyPassword=await bcryptjs.compare(password,user.password)

        if(!verifyPassword){
            return res.status(400).json({
                message:'Please check password',
                error:true
            })
        }

        const tokenData = {
            id : user._id,
            email : user.email 
        }
        
        const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn : '1d'})
        
        console.log(token)
        return res.status(200).json({
            message : "Login successfully",
            token : token,
            success :true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports={checkPassword}
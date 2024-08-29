const UserModel=require('../models/userModel')
const bcrpytjs=require('bcryptjs')
require('dotenv').config()

const registerUser=async(req,res,next)=>{
    try {
        const {name,email,password,profile_pic}=req.body;

        if(!name||!email||!password||!profile_pic){
            return res.status(400).json({message:"All fields are required"})
        }
        const checkEmail=await UserModel.findOne({email})

        if(checkEmail){
            return res.status(400).json({
                message:'ALready user exists',
                error:true
            })
        }
        
        //password into hashpassword
        const salt=await bcrpytjs.genSalt(10)
        const hashpassword=await bcrpytjs.hash(password,salt)

        const payload={
            name,
            email,
            profile_pic,
            password:hashpassword
        }

        const user=new UserModel(payload)
        const userSave=await user.save()

        return res.status(201).json({
            message:'User created successfully',
            data:userSave,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

const LogIn=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({message:"All field are required"})
        }

        const validUser=await UserModel.findOne({email})

        if(!validUser){
            return res.status(400).json({message:"User not found"})
        }

        const validPassword=await bcrpytjs.compare(password,validUser.password)

        if(!validPassword){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token=jwt.sign({
            user:validUser._id
        },
        process.env.JWT_SCRET_KEY,
        {expiresIn:"7d"})

        const {password:pass,...rest}=validUser._doc
        return res.status(201).json({
            success: true,
            token,
            rest
          });
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

const logOut=async(req,res,next)=>{
    try {
        const {userId}=req.body;

        const findUser=await UserModel.findById({userId});
        const token=jwt.sign({
            user:userId
        },
        process.env.JWT_SCRET_KEY,
        {expiresIn:0}
    )

    return res.status(200).json({
        success:true,
        token,
        userId:findUser._id,
        username:findUser.username,
        email:findUser.email
    })

    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

const getUserdetails=async(req,res,next)=>{
    try {
        const userId=req.user.id;

        const findUser=await UserModel.findById(userId);

        if(!findUser){
            return res.status(404).json({message:"User not found"})
        }

        return res.status(201).json({findUser})
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

module.exports={
    registerUser,
    LogIn,
    logOut,
    getUserdetails
}
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const requireAuth=async(req,res,next)=>{
    const authHeader=req.header("Authorization")

    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token=authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user={
            id:decode.user
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }

}

module.exports={
    requireAuth
}
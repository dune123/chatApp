const express=require('express')
const {registerUser, LogIn, logOut}=require('../controllers/registerUser')
const { requireAuth } = require('../middleware/requireAuth')

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',LogIn)
router.post('/logout',requireAuth,logOut)

module.exports=router
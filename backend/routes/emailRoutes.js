const express=require('express')
const {checkEmail}=require('../controllers/checkEmail')

const router=express.Router()

router.post('/checkEmail',checkEmail)

module.exports=router
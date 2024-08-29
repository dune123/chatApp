const express=require('express')
const {checkPassword}=require('../controllers/checkPassword')

const router=express.Router()

router.post('/checkPassword',checkPassword)

module.exports = router
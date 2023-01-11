const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const auth = require('../middlewares/auth')
const Mysqlconnection = require('../config/db')


//get for sql
router.get("/",(req,res)=>{
    Mysqlconnection.query("SELECT * from employeedb.employee",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

router.post('/signup', authController.signup)
router.post('/login',authController.login)
router.put('/update_profile',auth,authController.update_profile)
router.delete('/delete_profile',auth,authController.delete_profile)

module.exports = router
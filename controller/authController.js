// const Usermodel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const joi = require("joi")
const Mysqlconnection = require('../config/db')

//get api for sql 




//User signup Api
async function signup(req,res) {
  try{
    
    const Signup = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
        name: joi.string().required()

      })
      const { error } = Signup.validate(req.body)
      if (error) {
        return res.status(422).send({ Message: error.details[0].message })
      }
  
    const { name, email, password } = req.body
    console.log(req.body)

    const find_user = await Usermodel.findOne({
        email: email
    })
    if(find_user){
       return res.status(422).send({Message:'User is already registered'}) 
    }
 
     const salt = bcrypt.genSaltSync(10) 
     const hash = bcrypt.hashSync(password, salt) 
 
    const user = new Usermodel ({
      name,  
      email,
      password: hash
    })
    user.save()
    return res.status(200).send({Message: 'User registered successfully'})

  }catch(e){
    console.log(e)
    return res.status(500).send({Message: `Something went wrong ${e}`})
  }
  
}


//Login Api
async function login(req,res) {
try{
    const login = joi.object({
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")).required(),
    
  })
  const { error } = login.validate(req.body)
  if (error) {
    return res.status(422).send({ Message: error.details[0].message })
  }

    const { email,password } = req.body

    const login_user = await Usermodel.findOne({
     
      email: email      
    })
    

    if(!login_user){  
       return res.status(422).send({Message:'User not found'})
    }

    const compare = bcrypt.compareSync(password, login_user.password)
    if (!compare) {
       return res.status(422).send({ Message: 'Please enter valid password.' })
    }

    const token = jwt.sign({ id: login_user.id, email: login_user.email }, process.env.JWT_SECRET, { expiresIn: '20m' })
     return res.status(200).send({ Message: 'User login successfully.' , Token: token  })

    }catch(e){
    console.log(e)
    return res.status(500).send({Message: `Something went wrong ${e}`})
}
}

//update_profile Api
async function update_profile(req, res) {
  try {
  const update_profile = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    name: joi.string().required()

  })
  const { error } = update_profile.validate(req.body)
  if (error) {
    return res.status(422).send({ Message: error.details[0].message })
  }
  var userid = req.user._id
  console.log(userid)
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log(name,email,password)
    var updatedata =await Usermodel.findByIdAndUpdate(
      {
        _id: userid       
      },
     
      { name, email, password: hash },{new:true}
      
    );
    console.log('update data checking',updatedata)
    return res.status(200).send({ Message: "User update succesfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ Error: e });
  }
}

//delete_profile Api
async function delete_profile(req, res) {
  try {
    await Usermodel.deleteOne({
      where: {
        id: req.user.id,
      },
    });
    return res.status(200).send({ Message: "User deleted succesfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ Error: e });
  }
}



module.exports = {
    signup,
    login,
    update_profile,
    delete_profile
}
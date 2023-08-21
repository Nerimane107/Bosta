

const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const emailValidator = require('deep-email-validator');
const Verifier = require("email-verifier");

const jwt = require('jsonwebtoken');

async function isEmailValid(email) {
    return await emailValidator.validate(email)
  }

router.post('/signup' ,async (req,res) =>{
   // const {valid, reason, validators} = await isEmailValid(req.body.email);
    const user = await User.find({email :req.body.email});
    if(user.length>=1){
        return res.status(409).json({
            messge : "Email already exists"
        });

    }
    else{
     bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            });
        } else{
        
    const newUser = new User({
        email : req.body.email,
        password : hash
      }); 
      const token = jwt.sign({
        email : newUser.email,
        userId :newUser._id
    },process.env.JWT_KEY,{
        expiresIn :"1h"
    });
    newUser.token = token;
      
    newUser.save().then(result =>{
        console.log(result)
        res.status(201).json({
            message:"User Created",
            token : token
        });
     }).catch(err => {console.log(err);
     res.status(500).json({
        error :err
     });});
    }
});
    }
});

    

              
      

router.post('/login',(req,res)=>{
User.findOne({email : res.body.email}).then(user =>{
            if(user.length<1){
                return res.status(404).json({
                    message : 'Authorization failed'
                });
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message :'Authentication failed'
                    });

                }
                if(result){
              const token = jwt.sign({
                    email : user[0].email,
                    userId :user[0]._id
                },process.env.JWT_KEY,{
                    expiresIn :"1h"
                });
                user.token = token;
                    return res.status(200).json({
                        message :'Authentication successful',
                        token : token
                    });
                
                }
            })
})
});

module.exports = router
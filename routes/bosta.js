 const express = require('express')
const router = express.Router()
const Check = require('../models/checks')
const checkAuth = require('../checker/check-auth');
const users = require('../models/users');

router.post('/createCheck',checkAuth,async (req,res) =>{ 
const check = req.body
const newCheck = new Check(check);
const token = req.headers.authorization;
newCheck.userToken = token;
try{
    const savedCheck = await newCheck.save();
    const user = users.find({token : token});
    user.checks.add(req.body.url);
    
   return res.status(201).json(savedCheck);

}
catch(err){
    res.status(400).json({message :err.message});
}
})


router.get('/',checkAuth,async (req,res) =>{
    const token = req.headers.authorization;
    try{
        const Allchecks = await Check.find({userToken : token});
        res.json(Allchecks);

    }
    catch(err){
        res.status(500).json({message :err.message});
    }
    
});

router.get('/:id',checkAuth,async (req,res)=>{
    const token = req.headers.authorization;
    try{
    const check = await Check.find({_id : req.params.id,userToken : token});
    if(check == null){
        return res.status(404).json({message : "Check not found"});
    }
    res.json(check);
    }
    catch(err){
        return res.status(500).json({message :err.message});

    }
});

router.get('/report',checkAuth,async(req,res)=>{

});

router.delete('/:id',checkAuth,async(req,res) =>{
    const token = req.headers.authorization;
   try{
    const check =await Check.find({_id : req.params.id,userToken : token});

    if(check==null){
        return res.status(404).json({message : "Check not found"});
    }
    else{
   await Check.deleteOne(check);
    res.json({message :'Deleted check'});
    }
   }
   catch(err){
    res.status(500).json({message :err.message});
   }
});




module.exports = router
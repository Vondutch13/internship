const express = require('express')
const router = express.Router()
const Usermod = require('../models/usermod')
const {regValidation, loginValidation} = require('../validation')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

router.get('/',(req,res)=>{
    res.send('this is userz')  
})

router.post('/', async (req,res)=>{

    try{
        //general validation
        const valResult = await regValidation.validateAsync(req.body);
        console.log(valResult);
        
        //existing email validation
        const emailExist = await Usermod.findOne({email:req.body.email})
        if(emailExist) return res.status(400).send('User email already in use.')
    
        const user = new Usermod({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email
        })
    
        const addUser = await user.save()
        res.status(201).json(addUser)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

router.post('/login',async (req,res) =>{

    try{
        
        //check if email exist
        const userEmail = await Usermod.findOne({email:req.body.email})
        if(!userEmail) return res.status(400).send('Email incorrect')

        //check password if passs correct
        const validPass = await bcrypt.compare(req.body.password, userEmail.password);
        if(!validPass) return res.status(400).send('Password Incorrect')

        //create token
        const token = jwt.sign({_id:userEmail._id}, process.env.token_secret)
        res.header('auth-token', token).send(token);
        
    }catch(err){
        res.status(400).json({message: err.message})
    }
    

})

module.exports = router
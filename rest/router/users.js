const bcrypt = require('bcryptjs/dist/bcrypt')
const express = require('express')
const router = express.Router()
const Usermod = require('../models/usermod')
const {regValidation, loginValidation} = require('../validation')
const jwt = require("jsonwebtoken");




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

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password, salt);

        const user = new Usermod({
            name:req.body.name,
            password:hashpass,
            email:req.body.email
        })
    
        const addUser = await user.save()
        res.status(201).json(addUser)
        console.log('User added')
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
        // const token = jwt.sign({_id:userEmail._id}, process.env.tokensecret)
        // res.json({token:token})
        // console.log(token)
        
        const accessToken = jwt.sign({_id:userEmail._id}, process.env.tokensecret)
        console.log(accessToken)
        res.json({accessToken:accessToken})


    }catch(err){
        res.status(400).json({message: err.message})
    }
    
    
    function verifyy(req,res,next){
        const bearerHead = req.headers['authorization']
        const token = bearerHead && bearerHead.split(' ')[1]
        if(token == null){
           console.log('nooooo')
           return res.sendStatus(401)
        } 
    
        jwt.verify(token, process.env.tokensecret, (err, user) => {
           if(err) return res.sendStatus(403);
           req.user = user
           next()
        })
    }


})


module.exports = router
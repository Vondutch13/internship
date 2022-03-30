const express = require('express')
const router = express.Router()
const Usermod = require('../models/usermod')
const {regValidation, loginValidation} = require('../validation')

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

module.exports = router
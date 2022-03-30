const express = require('express')
const router = express.Router()
const Usermod = require('../models/usermod')

router.get('/',(req,res)=>{
    res.send('this is userz')
})

router.post('/', async (req,res)=>{
    const user = new Usermod({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    })
    try{
        const addUser = await user.save()
        res.status(201).json(addUser)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

module.exports = router
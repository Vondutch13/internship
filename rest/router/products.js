const express = require('express')
const router = express.Router()
const verify = require('./verifyToken')

router.get('/',verify, (req,res) => {
    res.json({ 
    products:{
        name: 'trust kendi',
        price:'79'
    } })
})



module.exports = router;
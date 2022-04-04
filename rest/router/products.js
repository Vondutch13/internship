const express = require('express')
const router = express.Router()
const verify = require('./verifyToken')

router.get('/', verify, (req,res) => {
    res.send(req.user._id)
})



module.exports = router;
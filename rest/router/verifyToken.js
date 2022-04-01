 const jwt = require('jsonwebtoken')


 module.exports = function (req,res,next){
     const token = req.header('auth-token');
     if(!token) return res.status(401).status('Access forbidden');
     try{
        const verified = jwt.verify(token, process.env.token_secret);
        req.user = verified;
        next();
     }catch(err){
        res.status(400).send('Invalid Token');
     }
 }
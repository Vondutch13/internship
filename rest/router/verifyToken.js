 const { status } = require('express/lib/response')
const jwt = require('jsonwebtoken')


//  module.exports = function (req,res,next){
//      const token = req.header('auth-token');
//       console.log(token);
//      if(!token) return res.status(401).status('Access forbidden');
//      try{
//         const verified = jwt.verify(token, process.env.token_secret);
//         req.userEmail = verified; 
//         next();
//      }catch(err){
//         res.status(400).send('Invalid Token');  
//      }
//  }

 module.exports = function(req,res,next){
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
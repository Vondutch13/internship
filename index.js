const express = require('express')
const app =  express()
require('dotenv').config()
const mongoose = require('mongoose')
const userRoute = require('./rest/router/users')
const productRoute = require('./rest/router/products')


app.use(express.json())
app.get('/',(req,res)=>{
    res.send('HOMEs')
})
app.use('/users',userRoute)
app.use('/products',productRoute)


mongoose.connect(process.env.dbconn,{useNewUrlParser:true})
const dbcon = mongoose.connection
dbcon.on('error', (err) => console.log(err));
dbcon.once('open', () => console.log('Connected to db'));


app.listen(5000, () =>  console.log('server started'));

module.exports = app
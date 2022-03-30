const express = require('express')
const app =  express()
require('dotenv').config()
const mongoose = require('mongoose')
const userRoute = require('./router/users')

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('HOME')
})
app.use('/users',userRoute)

mongoose.connect(process.env.dbconn,{useNewUrlParser:true})
const dbcon = mongoose.connection
dbcon.on('error', (err) => console.log(err));
dbcon.once('open', () => console.log('Connected to db'));


app.listen(4000, () =>  console.log('server started'));
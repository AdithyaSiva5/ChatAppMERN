const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const app = express();
app.get('/test',(req,res)=>{
    res.json('test ok')
});


app.post('/register' , (req,res)=>{
    const {username,password} = req.body;

})
app.listen(4000,()=>{
    console.log("Connected")
})

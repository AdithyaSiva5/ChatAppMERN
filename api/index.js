const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookiParser = require('cookie-parser')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET

const app = express();
app.use(express.json())
app.use(cookiParser())

app.use(cors({
    credentials: true,
    origin : process.env.CLIENT_URL,
}))
app.get('/profile',async(req,res)=>{
    const token = req.cookies?.token;
    if(token){

        jwt.verify(token, jwtSecret , {} , (err,userData)=>{
            if(err) throw err
            res.json( userData);
        })
    }else{
        res.status(401).json("no token")
    }
})

app.post('/register' , async (req,res)=>{
    const {username,password} = req.body;
    try {
        
        const createdUser = await User.create({username,password})
        jwt.sign({userId : createdUser._id,username},jwtSecret,{},(err,token) =>{
            if(err) throw err;
            res.cookie('token' , token  ,{sameSite:'none',secure:true}).status(201).json({
                id: createdUser._id,
                username,
            })
        } )
    } catch (error) {
        console.error(error);
        json.status(500).json('error')
    }


})
app.listen(4000,()=>{
    console.log("Connected")
})

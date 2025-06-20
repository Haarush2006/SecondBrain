import express from 'express'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { ContentModel, userModel } from './db';
import { JWT_USER_SECRET } from './config';
import { userMiddleware } from './UserMiddleware';


const app = express()
app.use(express.json())

app.post('/api/v1/signup',async (req,res)=>{
    //TODOS: zod, hashed password
    const {username, password} = req.body
    try {
        
        await userModel.create({
            username,
            password
        })
        res.json({
            message:"User SignedUp"
        })
    }

    catch (error) {
        res.status(411).json({
            message:"username taken"
        })
    }
    
})

app.post('/api/v1/signin',async (req,res)=>{
    const {username, password} = req.body

    const user = await userModel.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_USER_SECRET)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})



app.post('/api/v1/content',userMiddleware,async (req,res)=>{

    const {link, title} = req.body
    await ContentModel.create({
        title,
        link,
        //@ts-ignore
        UserId:req.UserId,
        tags: []
    })

    res.json({
        message:"Content added"
    })
})

app.get('/api/v1/content',userMiddleware, async (req,res)=>{
    // @ts-ignore
    const UserId = req.UserId
    const content = await ContentModel.find({
        UserId
    }).populate("UserId","username")
    res.json({
        content
    })
})

app.delete('/api/v1/content',userMiddleware, async (req,res)=>{
    //@ts-ignore
    const UserId = req.UserId,
    const contentId = req.body.contentId
    await ContentModel.deleteOne({
        _id:contentId,
        UserId
    })
    res.json({
        message:"Deleted"
    })
})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{

})


app.listen(3000,()=>{console.log("working")})
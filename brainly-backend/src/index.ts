require('dotenv').config()
import express from "express";
import mongoose from "mongoose";
import { ContentModel, UserModel } from "./db";
import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from "./config";
import {userMiddleware} from "./middleware";


const app = express();
app.use(express.json())
const port = process.env.PORT

app.post("/api/v1/signup", async(req, res) => {
    const [username, password] = req.body

    await UserModel.create({
        username,
        password
    })
    res.json({msg:"user signup successfully"})
})
app.post("/api/v1/signin", async(req, res) => {
    const [username, password]= req.body;

    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id : existingUser.id
        }, JWT_PASSWORD)
        res.json({token})
    }else{
        res.status(403).json({msg:"Incorrect credentials"})
    }
    
    
})

app.post("/api/v1/content", userMiddleware  ,async(req, res) => {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({msg:"content added"})
})

app.get("/api/v1/content", userMiddleware, async(req, res) => {
     // @ts-ignore
     const userId = req.userId;
     const content = await ContentModel.find({
         userId: userId
     }).populate("userId", "username")
     res.json({
         content
     })
})

app.delete("/api/v1/content", userMiddleware ,async(req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(()=> console.log(`app is running on ${port}`))


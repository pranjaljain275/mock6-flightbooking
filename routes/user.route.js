const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../models/user.model");
require("dotenv").config();

const userRouter = express.Router();

// Register
userRouter.post("/register", async (req,res)=>{
    try {
        const data = req.body;
        const user = new Usermodel(data);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(201).send("User Registered");
        console.log(user);
    } catch (err) {
        res.status(404).send("Something Went Wrong");
        console.log({msg: err.message});
    }
})

// Login
userRouter.post("/login", async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user =  await Usermodel.findOne({email});
        if(user != undefined) {
            let result = await bcrypt.compare(password, user.password);
            if(result == true) {
                const token = await jwt.sign({userId: user._id}, process.env.key);
                res.status(201).send({token});
            }else{
                res.status(404).send({msg: "Wrong Credential"});
            }
        }else{
            res.status(404).send({msg: "Wrong Credential"});
        }
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

module.exports = {
    userRouter
}
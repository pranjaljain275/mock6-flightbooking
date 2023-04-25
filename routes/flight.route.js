const express = require("express");
const { Flightmodel } = require("../models/flight.model");
const { authenticator } = require("../middlewares/authenticate");

const flightRouter = express.Router();

// Create flights
flightRouter.post("/", authenticator ,async (req,res)=>{
    try {
        const data = req.body;
        const flight = new Flightmodel(data);
        await flight.save();
        res.status(201).send(flight);
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

// Get flights
flightRouter.get("/", async (req,res)=>{
    try {
        const flight =  await Flightmodel.find();
        res.status(200).send(flight);
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

// Get particular flights
flightRouter.get("/:id", async (req,res)=>{
    try {
        const ID = req.params.id;
        const flight =  await Flightmodel.findOne({_id: ID});
        res.status(200).send(flight);
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

// update flights
flightRouter.patch("/:id",authenticator, async (req,res)=>{
    try {
        const ID = req.params.id;
        const update = req.body;
        let flightdata = await Flightmodel.findOne({_id: ID});
        if(flightdata.userId == req.body.userId) {
            const flight =  await Flightmodel.findByIdAndUpdate({_id: ID}, update);
            res.status(204).send({msg:`Flight with id ${ID} is updated`});
        }else{
            res.status(404).send("Wrong Login Credential");
        }
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

// delete flights
flightRouter.delete("/:id",authenticator, async (req,res)=>{
    try {
        const ID = req.params.id;
        let flightdata = await Flightmodel.findOne({_id: ID});
        if(flightdata.userId == req.body.userId) {
            const flight =  await Flightmodel.findByIdAndDelete({_id: ID});
            res.status(202).send({msg:`Flight with id ${ID} is deleted`});
        }else{
            res.status(404).send("Wrong Login Credential");
        }
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

module.exports = {
    flightRouter
}
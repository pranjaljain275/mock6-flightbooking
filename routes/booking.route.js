const express = require("express");
const { Bookingmodel } = require("../models/booking.model");
const { authenticator } = require("../middlewares/authenticate");
const { Usermodel } = require("../models/user.model");
const { Flightmodel } = require("../models/flight.model");

const bookingRoute = express.Router();

// Book flights
bookingRoute.post("/booking", authenticator ,async (req,res)=>{
    try {
        const data = req.body;
        const bookFlight = new Bookingmodel(data);
        await bookFlight.save();
        res.status(201).send(bookFlight);
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

// Get Booking
bookingRoute.get("/dashboard" ,async (req,res)=>{
    try {
        const bookFlight = await Bookingmodel.find();
        console.log(bookFlight);
        let arr = [];
        for(let i=0;i<bookFlight.length;i++){
            let userData = await Usermodel.findOne({_id: bookFlight[i].user});
            let flightData = await Flightmodel.find({_id: bookFlight[i].flight});
            let obj = {user: userData, flight: flightData};
            arr.push(obj);
        }
        res.status(200).send(arr);
    } catch (err) {
        console.log({msg: err.message});
        res.status(404).send("Something Went Wrong");
    }
})

module.exports = {
    bookingRoute
}
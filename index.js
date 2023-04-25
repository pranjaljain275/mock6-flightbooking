const express = require("express");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/user.route.js");
const { flightRouter } = require("./routes/flight.route.js");
const { bookingRoute } = require("./routes/booking.route.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api/flights", flightRouter);
app.use("/api", bookingRoute);

app.get("/", (req,res)=>{
    res.send("Welcome to Air Ticket Booking App");
})

app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("DB connection");
    } catch (err) {
        console.log("Not connecting to DB");
    }
    console.log(`Server is running on port ${process.env.port}`);
})
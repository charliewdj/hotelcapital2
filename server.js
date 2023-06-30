const express = require("express");

const app = express();

const dbConfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const cors = require("cors");
const path = require('path');

app.use(express.json())

app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)
app.use("/api/bookings", bookingsRoute)
app.use(cors())

//app.get("/", (req, res) => {
    //res.setHeader("Access-Control-Allow-Credentials", "true");
    //res.send("API is running..");
//})

//Untuk Serve si FrontEnd nya pake ini !!!!!!!
app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started using nodemon"));




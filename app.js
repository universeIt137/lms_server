const express = require("express");
const app = new express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const dbPort = process.env.DB_PORT;

mongoose.connect(dbPort).then(()=>{
    console.log(`--Database connected---`)
}).catch((e)=>{
    console.log(e)
})

app.get("/",async(req,res)=>{
    res.send("Server running");
})


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// user routes
const router = require("./src/routes/userApi");
app.use("/api/v1",router);



module.exports = app;
require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static(__dirname + '/public'));
//mongoose.connect(process.env.MONGO);

app.get("/",(req,res)=>{
  res.sendFile(__dirname +"/public/index.html");
  console.log("res send");
});

app.listen(process.env.PORT||3000,()=>console.log("server started"));
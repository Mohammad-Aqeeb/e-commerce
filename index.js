const express = require("express");
require("dotenv").config();
const route = require("./routes/route");
const dbconnect = require("./config/database");

const app = express();

app.use(express.json())

app.use("/api/v1", route);

dbconnect();

app.listen(process.env.PORT_NO, ()=>{
    console.log(`App started at port no ${process.env.PORT_NO}`);
})
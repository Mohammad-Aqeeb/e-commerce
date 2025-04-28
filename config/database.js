const mongoose = require("mongoose");

require("dotenv").config();

function dbconnect(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("database connected successfully");
    })
    .catch((error)=>{
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbconnect;
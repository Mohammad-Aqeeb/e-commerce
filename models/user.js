const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        enum : ["Admin", "User"],
        required : true
    }
})

module.exports = mongoose.model("User", userSchema);
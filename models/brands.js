const mongoose = require("mongoose");

const brandsSchema = mongoose.Schema({
    brandName : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("brands", brandsSchema);
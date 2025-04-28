const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    brandName : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("brands", brandSchema);
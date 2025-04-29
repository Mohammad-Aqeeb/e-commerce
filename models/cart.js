const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    ProductId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
        required : true
    }]
})

module.exports = mongoose.model("Cart", cartSchema)
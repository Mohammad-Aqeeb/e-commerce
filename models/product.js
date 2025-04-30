const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    description : {
        type : String,
        required : true,
    },

    image : {
        type : String,
        required : true
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "categories"
    },

    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "brands"
    }

})

module.exports = mongoose.model("products", productSchema);
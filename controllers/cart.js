const Cart = require("../models/cart");
const product = require("../models/product");
const user = require("../models/user");

async function addProductToCart(req, res){
    try{
        const {UserId, productId} = req.body;

        if(!UserId || !productId){
            return res.status(400).json({
                success : false,
                message : "Please provide valid data"
            })
        }

        const existingProduct = await product.findById(productId);
        
        if(!existingProduct){
            return res.status(400).json({
                success : false,
                message : "Product not found"
            })
        }

        let existingCart = await Cart.findOne({UserId});

        if(!existingCart){
            existingCart = await Cart.create({UserId, ProductId : [productId]});

            return res.status(200).json({
                success : true,
                data : existingCart,
                message : "Item added to the cart"
            })
        }

        const data = await Cart.findOneAndUpdate(
            {UserId : UserId},
            {$push : {ProductId : productId}}, 
            {new : true}
        ).populate("ProductId").exec();

        res.status(200).json({
            success : true,
            data : data,
            message : "Item added to the cart"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Product not addedd",
            error : error.message
        })
    }
}

async function deleteProductFromCart(req, res){
    try{
        const {productId, UserId} = req.body;

        const data = await Cart.findOneAndUpdate(
            { UserId: UserId },
            { $pull: { ProductId: productId } },
            { new: true }
          ).populate("ProductId").exec();

        res.status(200).json({
            success : true,
            data: data,
            message : "Product deleted successfully"
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            message : "error while deleting from cart",
            error : error.message
        })
    }
}

module.exports = {
    addProductToCart,
    deleteProductFromCart
};
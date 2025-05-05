const logger = require("../config/logger");
const Cart = require("../models/cart");
const product = require("../models/product");
const user = require("../models/user");

async function addProductToCart(req, res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);

        const {UserId, productId} = req.body;

        if(!UserId || !productId){
            logger.warn("Please provide valid data")
            return res.status(400).json({
                success : false,
                message : "Please provide valid data"
            })
        }

        const existingProduct = await product.findById(productId);
        
        if(!existingProduct){
            logger.warn("Product not found")
            return res.status(400).json({
                success : false,
                message : "Product not found"
            })
        }

        let existingCart = await Cart.findOne({UserId});

        if(!existingCart){
            existingCart = await Cart.create({UserId, ProductId : [productId]});

            logger.info("Item added to the cart")
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


        logger.info("Item added to the cart");
        res.status(200).json({
            success : true,
            data : data,
            message : "Item added to the cart"
        })
    }
    catch(error){
        logger.error("Item not added")
        res.status(500).json({
            success : false,
            message : "Item not added",
            error : error.message
        })
    }
}

async function deleteProductFromCart(req, res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);

        const {productId, UserId} = req.body;

        const data = await Cart.findOneAndUpdate(
            { UserId: UserId },
            { $pull: { ProductId: productId } },
            { new: true }
          ).populate("ProductId").exec();

        
        logger.info("Product deleted successfully")
        res.status(200).json({
            success : true,
            data: data,
            message : "Product deleted successfully"
        })
    }
    
    catch(error){
        logger.error(error);
        res.status(500).json({
            success : false,
            message : "error while deleting from cart",
            error : error.message
        })
    }
}

async function getCartItem(req,res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);
        
        const userId = req.body.userId;
        const data = await Cart.find({UserId : userId}).populate("ProductId").exec()

        logger.info("Cart Item fetched succefully");
        res.status(200).json({
            success : true,
            data : data,
            message : "Cart Item fetched succefully"
        })
    }
    catch(error){
        logger.error(error)
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Error fetching product from cart"
        })
    }
}

module.exports = {
    addProductToCart,
    deleteProductFromCart,
    getCartItem
};
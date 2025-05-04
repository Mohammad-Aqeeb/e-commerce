const logger = require("../config/logger");
const product = require("../models/product")
const cloudinary = require("cloudinary")

async function createProduct(req, res){
    try{
        const {productName, price, description, category, brand} = req.body;
        const image = req.files.image;

        console.log(image);
        
        const folder = "Home/images";
        const {options} = {folder};
        const response = await cloudinary.uploader.upload(image.tempFilePath, options);

        console.log( response.secure_url);
        const data = await product.create({productName, price, category, brand, description, image : response.secure_url});
        
        logger.info("Product addded succesfully")
        res.status(200).json({
            success : true,
            data : data,
            message : "Product addded succesfully"
        })
    }

    catch(error){
        logger.error(error);
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Internal server error",
        })
    }
}

async function getProduct(req, res){
    try{
        const data = await product.find({}).populate(["category", "brand"]).exec();

        if(!data || data.lenght==0){
            logger.warn("Product not found")
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }

        logger.info("product fetched successfully");
        res.status(200).json({
            success : true,
            data : data,
            message : "product fetched successfully"
        })
    }
    catch(error){
        logger.error(error)
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

async function deleteProduct(req, res){
    try{
        const {id} = req.body;
        
        if(!id){
            logger.warn("product not exist")
            return res.status(404).json({
               success : false,
               message : "product not exist"
           })
        }

        await product.findByIdAndDelete(id);

        logger.info("product deleted successfully")
        res.status(200).json({
            success : true,
            message : "product deleted successfully"
        })
    }
    catch(error){
        logger.error(error);
        res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
    }
}

async function updateProduct(req, res){
    try{
        const {id, productName, price} = req.body;

        if(!id){
            logger.warn("product not found")
             return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }

        const data = await product.findByIdAndUpdate({_id : id},{productName : productName, price : price},{new : true});

        logger.info("product updated successfully")
        res.status(200).json({
            success : true,
            data : data,
            message : "product updated successfully"
        })
    }
    catch(error){
        logger.error(error)
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
};
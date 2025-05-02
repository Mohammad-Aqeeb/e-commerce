const product = require("../models/product");

async function getProductByBrand(req, res){
    try{
        const brandId = req.body.brandId;

        if(!brandId){
            res.status(500).json({
                success : false,
                message : "No product found"
            })
        }

        const data = await product.find({brand :{ $in : brandId}}).populate(["brand","category"]).exec();

        res.status(200).json({
            success : true,
            data : data,
            message : `Product fetched successfuly`
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
    }
}


async function getProductByCategory(req, res){
    try{
        const categoryId = req.body.categoryId;

        if(!categoryId){
            res.status(500).json({
                success : false,
                message : `No product found`
            })
        }

        const data = await product.find({category : categoryId}).populate(["brand","category"]).exec();

        res.status(200).json({
            success : true,
            data : data,
            message : "Product fetched successfuly"
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
    }
}
module.exports = {
    getProductByBrand,
    getProductByCategory
}
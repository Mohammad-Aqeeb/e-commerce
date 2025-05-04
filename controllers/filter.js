const logger = require("../config/logger");
const product = require("../models/product");

async function getProductByBrand(req, res){
    try{
        const brandId = req.body.brandId;

        if(!brandId){
            logger.warn("No product found")
            res.status(500).json({
                success : false,
                message : "No product found"
            })
        }

        const data = await product.find({brand :{ $in : brandId}}).populate(["brand","category"]).exec();

        logger.info("Product fetched successfuly")
        res.status(200).json({
            success : true,
            data : data,
            message : "Product fetched successfuly"
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


async function getProductByCategory(req, res){
    try{
        const categoryId = req.body.categoryId;

        if(!categoryId){
            logger.warn("No product found")
            res.status(500).json({
                success : false,
                message : "No product found"
            })
        }

        const data = await product.find({category : categoryId}).populate(["brand","category"]).exec();

        logger.info("Product fetched successfuly")
        res.status(200).json({
            success : true,
            data : data,
            message : "Product fetched successfuly"
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


async function getFilterProduct(req, res){
        try{

            const filterData = req.body.filterData;
            const brandId = filterData.brandId;
            const categoryId = filterData.categoryId;
    
            if(brandId.length === 0 && categoryId.length === 0){
                const data = await product.find({}).populate(["brand","category"]);

                logger.info("Product fetched successfuly")
                return res.status(200).json({
                    success : true,
                    data : data,
                    message : `Product fetched successfuly`
                })
            }

            if(!(brandId.length === 0) && !(categoryId.length === 0)){
                const data = await product.find({
                    brand :{ $in : brandId}, 
                    category :{ $in : categoryId}
                }).populate(["brand","category"]).exec();

                logger.info("Product fetched successfuly")
                res.status(200).json({
                    success : true,
                    data : data,
                    message : `Product fetched successfuly`
                })
            }

            if(brandId.length === 0 ){
                const data = await product.find({category :{ $in : categoryId}}).populate(["brand","category"]).exec();
                
                logger.info("Product fetched successfuly")
                return res.status(200).json({
                    success : true,
                    data : data,
                    message : `Product fetched successfuly`
                })
            }

            if(categoryId.length === 0 ){
                console.log("DDDDDDDD");
                const data = await product.find({brand :{ $in : brandId}}).populate(["brand","category"]).exec();
                
                logger.info("Product fetched successfuly")
                return res.status(200).json({
                    success : true,
                    data : data,
                    message : `Product fetched successfuly`
                })
            }

        }
        catch(error){
            logger.error(error);
            console.log(error);
            res.status(500).json({
                success : false,
                message : "Internal server error",
                error : error.message
            })
        }
    }
module.exports = {
    getProductByBrand,
    getProductByCategory,
    getFilterProduct
}
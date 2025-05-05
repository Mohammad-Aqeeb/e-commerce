const logger = require("../config/logger");
const brand = require("../models/brands");

async function createBrand(req,res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);

        const brandName = req.body.brandName;
        const data = await brand.create({brandName});

        if(!brandName){
            logger.warn("Pleaser provide Brand name");
            return res.status(500).json({
                success : false,
                message : "Pleaser provide Brand name"
            })
        }

        logger.info("Brand added successfuly");
        res.status(200).json({
            success : true,
            data : data,
            message : "Brand added successfuly"
        })
    }
    catch(error){
        logger.error(error);
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Internal server error"
        })
    }
}

async function getBrands(req,res){
    try{
        const data = await brand.find({});

        logger.info("Brands fetched successfuly")
        res.status(200).json({
            success : true,
            data : data,
            message : "Brands fetched successfuly"
        })
    }
    catch(error){
        logger.error(error);
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Internal server error"
        })
    }
}

async function deleteBrand(req,res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);

        const brandId = req.body.brandId;
        await brand.findByIdAndDelete(brandId);

        logger.info("Brand deleted successfuly")
        res.status(200).json({
            success : true,
            message : "Brand deleted successfuly"
        })
    }
    catch(error){
        logger.error(error);
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Internal server error"
        })
    }
}

module.exports = {
    createBrand,
    getBrands,
    deleteBrand
};
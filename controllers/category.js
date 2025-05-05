const logger = require("../config/logger");
const category = require("../models/category");

async function createCategory(req,res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);

        const categoryName = req.body.categoryName;
        const data = await category.create({categoryName});


        logger.info("category added successfuly")
        res.status(200).json({
            success : true,
            data : data,
            message : "category added successfuly"
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

async function getCategory(req,res){
    try{
        const data = await category.find({});

        logger.info("category fetched successfuly")
        res.status(200).json({
            success : true,
            data : data,
            message : "category fetched successfuly"
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

async function deleteCategory(req,res){
    try{
        logger.debug(`⚪ Request Body: ${JSON.stringify(req.body)}`);

        const categoryId = req.body.categoryId;
        await category.findByIdAndDelete(categoryId);


        logger.info("category deleted successfuly")
        res.status(200).json({
            success : true,
            message : "category deleted successfuly"
        })
    }
    catch(error){
        logger.error(error);
;        res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message,
        })
    }
}

module.exports = {
    createCategory,
    getCategory,
    deleteCategory
};
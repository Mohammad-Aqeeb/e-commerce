const category = require("../models/category");

async function createCategory(req,res){
    try{
        const categoryName = req.body.categoryName;
        const data = await category.create({categoryName});

        res.status(200).json({
            success : true,
            data : data,
            message : "category added successfuly"
        })
    }
    catch(error){
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

        res.status(200).json({
            success : true,
            data : data,
            message : "category fetched successfuly"
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Internal server error"
        })
    }
}

async function deleteCategory(req,res){
    try{
        const categoryId = req.body.categoryId;
        await category.findByIdAndDelete(categoryId);

        res.status(200).json({
            success : true,
            message : "category deleted successfuly"
        })
    }
    catch(error){
        console.error(error)
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
const brand = require("../models/brands");

async function createBrand(req,res){
    try{
        const brandName = req.body.brandName;
        const data = await brand.create({brandName});

        res.status(200).json({
            success : true,
            data : data,
            message : "Brand added successfuly"
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

async function getBrands(req,res){
    try{
        const data = await brand.find({});

        res.status(200).json({
            success : true,
            data : data,
            message : "Brands fetched successfuly"
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

async function deleteBrand(req,res){
    try{
        const brandId = req.body.brandId;
        await brand.findByIdAndDelete(brandId);

        res.status(200).json({
            success : true,
            message : "Brand deleted successfuly"
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

module.exports = {
    createBrand,
    getBrands,
    deleteBrand
};
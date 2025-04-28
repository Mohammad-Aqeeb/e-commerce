const express = require("express");
const router = express.Router();

const { addProduct, getProduct, deleteProduct, updateProduct} = require("../controllers/Product");
const { createBrand, getBrands, deleteBrand } = require("../controllers/brand");
const { createCategory, getCategory, deleteCategory } = require("../controllers/category");

router.post("/createProduct", addProduct);
router.get("/getProduct", getProduct);
router.delete("/deleteProduct", deleteProduct);
router.put("/updateProduct", updateProduct);

router.post("/createBrand", createBrand);
router.get("/getBrands", getBrands);
router.delete("/deleteBrand", deleteBrand);

router.post("/createCategory", createCategory);
router.get("/getCategory", getCategory);
router.delete("/deleteCategory", deleteCategory);

module.exports = router;
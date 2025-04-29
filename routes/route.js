const express = require("express");
const router = express.Router();

const { createProduct, getProduct, deleteProduct, updateProduct,} = require("../controllers/Product");
const { createBrand, getBrands, deleteBrand } = require("../controllers/brand");
const { createCategory, getCategory, deleteCategory } = require("../controllers/category");
const { createUser, getUsers, deleteUser } = require("../controllers/user");
const { addProductToCart, deleteProductFromCart } = require("../controllers/cart");

router.post("/createProduct", createProduct);
router.get("/getProduct", getProduct);
router.delete("/deleteProduct", deleteProduct);
router.put("/updateProduct", updateProduct);

router.post("/createBrand", createBrand);
router.get("/getBrands", getBrands);
router.delete("/deleteBrand", deleteBrand);

router.post("/createCategory", createCategory);
router.get("/getCategory", getCategory);
router.delete("/deleteCategory", deleteCategory);

router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.delete("/deleteUser", deleteUser);
// router.put("/updateUser", updateUser);

router.post("/addProductToCart", addProductToCart);
router.delete("/deleteProductFromCart", deleteProductFromCart);

module.exports = router;
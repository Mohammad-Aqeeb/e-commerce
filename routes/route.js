const express = require("express");
const router = express.Router();

const { createProduct, getProduct, deleteProduct, updateProduct,} = require("../controllers/Product");
const { createBrand, getBrands, deleteBrand } = require("../controllers/brand");
const { createCategory, getCategory, deleteCategory } = require("../controllers/category");
const { createUser, getUsers, deleteUser, loginUser } = require("../controllers/user");
const { addProductToCart, deleteProductFromCart, getCartItem } = require("../controllers/cart");
const { getProductByBrand, getFilterProduct, getProductByCategory } = require("../controllers/filter");

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
router.post("/loginUser", loginUser);

router.post("/addProductToCart", addProductToCart);
router.delete("/deleteProductFromCart", deleteProductFromCart);
router.post("/getCartItem", getCartItem)

router.post("/getProductByBrand", getProductByBrand);
router.post("/getProductByCategory", getProductByCategory);
router.post("/getFilterProduct", getFilterProduct);

module.exports = router;
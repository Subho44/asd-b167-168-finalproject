const express = require("express");
const router = express.Router();
const { addProducts, getProducts } = require("../controllers/productController");

router.post("/seed", addProducts);
router.get("/", getProducts);

module.exports = router;
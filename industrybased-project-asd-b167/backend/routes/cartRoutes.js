const express = require("express");
const router = express.Router();
const cartctrl = require("../controllers/cartController");

router.post("/",cartctrl.addToCart);
router.get("/",cartctrl.getCartItems);
router.put("/:id",cartctrl.updateCartQuantity);
router.delete("/",cartctrl.removecartitem);
router.delete("/",cartctrl.clearcart);

module.exports = router;
const express = require("express");
const router = express.Router();
const orderctrl = require("../controllers/orderController");

router.post("/",orderctrl.placeorder);
router.get("/",orderctrl.getOrders);
router.put("/:id",orderctrl.updateOrderstatus);


module.exports = router;
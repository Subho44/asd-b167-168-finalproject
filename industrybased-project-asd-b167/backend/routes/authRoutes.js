const express = require("express");
const router = express.Router();
const authctrl = require("../controllers/authController");

router.post("/register",authctrl.register);
router.post("/verify",authctrl.verifyotp);

module.exports = router;
const express = require("express");

const router = express.Router();

router.use(express.json());

const sellerCntrl = require("../controllers/sellers");

router.get("/seller/dashboard", sellerCntrl.seller_dashboard_get);

module.exports = router;
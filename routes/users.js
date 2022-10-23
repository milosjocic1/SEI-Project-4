const express = require("express");

const router = express.Router();

const userCntrl = require("../controllers/users");

router.get("/user/dashboard", userCntrl.user_dashboard_get);

module.exports = router;
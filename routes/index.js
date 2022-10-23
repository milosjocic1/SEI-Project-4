const express = require("express");

const router = express.Router();

const indexCtrl = require("../controllers/index");

const isLoggedIn = require("../helper/isLoggedIn");

router.get("/", isLoggedIn, indexCtrl.index_get);

module.exports = router;

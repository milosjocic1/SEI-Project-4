const express = require("express");

const router = express.Router();

const indexCtrl = require("../controllers/index");

const isLoggedIn = require("../helper/isLoggedIn");

router.get("/",  indexCtrl.index_get);

module.exports = router;
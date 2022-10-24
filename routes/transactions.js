const express = require("express");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

const transactionCntrl = require("../controllers/transactions");


router.post("/create-checkout-session", transactionCntrl.checkout_session_create);


module.exports = router;
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    price: Number,
    shippingRate: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
}, { timestamps: true })

const Favourite = mongoose.model("Cart", cartSchema);

module.exports = {Cart};
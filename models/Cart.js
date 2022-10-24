// const mongoose = require("mongoose");

// const cartSchema = mongoose.Schema({
//     price: String,
//     shippingRate: String,
//     user: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     product: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product'
//     }],
// }, { timestamps: true })

const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const cartSchema = mongoose.Schema({
  products: [itemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    default: 0,
  },
  __v: { type: Number, select: false },
});

const Cart = mongoose.model("Cart", cartSchema);


module.exports = {Cart};
const mongoose = require("mongoose");

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

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: Number,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


const Cart = mongoose.model("Cart", cartSchema);

module.exports = {Cart};
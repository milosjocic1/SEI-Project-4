const {Cart} = require("../models/Cart");
const {User} = require("../models/User");
const {Product} = require("../models/Product");
const { isValidObjectId } = require("mongoose");
var ObjectID = require('mongodb').ObjectId;

const moment = require('moment');

exports.addItemToCart = async (req, res) => {
  let userId = req.query.userId;
  let user = await User.exists({ _id: userId });
  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let product = Product.findById(req.query.productId);
  

  if (!product)
    return res.status(400).send({ status: false, message: "Invalid product" });

  else {
    product = Product.findById(req.query.productId)
    .then( async (product) => {
      let cart = await Cart.findOne({userId: userId});

        if (cart) {
            let i = cart.products.findIndex((p) => p.productId == product);
            console.log("index is " + i)
        
            if (i > -1) {
              let productItem = cart.products[i];
              productItem.quantity += 1;
              cart.products[i] = productItem;
            } else {
          cart.products.push({ productId: product, quantity: 1 });  
          cart.save();   
          console.log(cart)
          return res.status(200).send({ status: true, updatedCart: cart });
        }
        } 
        else {
          const newCart = Cart.create({
            userId,
            products: [{ productId: product, quantity: 1 }],
          });
      
          return res.status(201).send({ status: true, newCart: newCart });
        }
    }) 
    .catch((err) => {
      console.log(err)
    })
  }

}
      
exports.getCart = async (req, res) => {
  let userId = req.query.userId.trim();
  let user = await User.findById(userId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId })
    .populate("products.productId")
    .then((cart) => {
      return cart
  })

  try {
    if (!cart){
      return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });
    } 
    else{
      let total = 0;
      cart.products.map((product) => {
        console.log(product)
        total += ((product.quantity * product.productId.price) + product.productId.shippingRate)
        return total
      })
      cart.total = total;
      res.status(200).json({cart});
    }

  } catch (error) {
    console.log(error);
  }
};


// exports.decreaseQuantity = async (req, res) => {
//   // use add product endpoint for increase quantity
//   let userId = req.params.userId;
//   let user = await User.exists({ _id: userId });
//   let productId = req.body.productId;

//   if (!userId || !isValidObjectId(userId) || !user)
//     return res.status(400).send({ status: false, message: "Invalid user ID" });

//   let cart = await Cart.findOne({ userId: userId });
//   if (!cart)
//     return res
//       .status(404)
//       .send({ status: false, message: "Cart not found for this user" });

//   let itemIndex = cart.products.findIndex((p) => p.productId == productId);

//   if (itemIndex > -1) {
//     let productItem = cart.products[itemIndex];
//     productItem.quantity -= 1;
//     cart.products[itemIndex] = productItem;
//     cart = await cart.save();
//     return res.status(200).send({ status: true, updatedCart: cart });
//   }
//   res
//     .status(400)
//     .send({ status: false, message: "Item does not exist in cart" });
// };

exports.removeItem = async (req, res) => {
  let userId = req.query.userId;
  let user = await User.exists({ _id: userId });
  let productId = req.body.productId;

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1);
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};


exports.shippingAndBilling = async (req, res) => {
  console.log("hi")
  let userId = req.query.userId;
  let user = await User.findById(userId);
  console.log("hi")
  try{
    User.findOneAndUpdate({_id: user._id},
      {
        $set: {
          "shippingAddress.addressLine1": req.body.addressLine1S,
          "shippingAddress.addressLine2": req.body.addressLine2S,
          "shippingAddress.city": req.body.cityS,
          "shippingAddress.country": req.body.countyS,
          "shippingAddress.postCode": req.body.postCodeS,
          "billingAddress.addressLine1": req.body.addressLine1B,
          "billingAddress.addressLine2": req.body.addressLine2B,
          "billingAddress.city": req.body.cityB,
          "billingAddress.country": req.body.countyB,
          "billingAddress.postCode": req.body.postCodeB         
        }

      })
  }
  catch(error){
    console.log(error)
  } 
}  

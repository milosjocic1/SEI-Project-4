const {Cart} = require("../models/Cart");
const {User} = require("../models/User");
const {Product} = require("../models/Product");
const { isValidObjectId } = require("mongoose");

const moment = require('moment');

// exports.cart_create_get = (req, res) => {
//     // res.render();
//     Product.find()
//     .then((products) => {
//     res.render("cart/add", {products});
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// }

exports.cart_index_get = (req, res) => {
    res.render("cart/index")
}

// exports.cart_addItem_post = (req, res) => {
//     const productID = `_${req.query.id}`
//     const product = Product.findById(productID);
//     const userID = `_${req.query.user}`;
//     const user = User.findById(userID); //TODO: the logged in user id
//     let cart = new Cart({
//         price: product.price,
//         shippingRate: product.shippingRate,
//         user: [{user}],
//         product: [{product}]

//     });
//     cart.save()
//     .then(() => {
//             user.transaction.push({cart});
//             return res.status(201).json({cart});
//         }) 
//     .catch ((err) => {
//       console.log(err);
//       res.status(500).send("Something went wrong");
//     })
//   };

exports.addItemToCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let productId = req.body.productId;
  if (!productId)
    return res.status(400).send({ status: false, message: "Invalid product" });

  let cart = await Cart.findOne({ userId: userId });

  if (cart) {
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity += 1;
      cart.products[itemIndex] = productItem;
    } else {
      cart.products.push({ productId: productId, quantity: 1 });
    }
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  } else {
    const newCart = await Cart.create({
      userId,
      products: [{ productId: productId, quantity: 1 }],
    });

    return res.status(201).send({ status: true, newCart: newCart });
  }
};

exports.getCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  res.status(200).send({ status: true, cart: cart });
};

exports.decreaseQuantity = async (req, res) => {
  // use add product endpoint for increase quantity
  let userId = req.params.userId;
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
    let productItem = cart.products[itemIndex];
    productItem.quantity -= 1;
    cart.products[itemIndex] = productItem;
    cart = await cart.save();
    return res.status(200).send({ status: true, updatedCart: cart });
  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};

exports.removeItem = async (req, res) => {
  let userId = req.params.userId;
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

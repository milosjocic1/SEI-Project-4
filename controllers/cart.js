const {Cart} = require("../models/Cart");
const {User} = require("../models/User");
const {Product} = require("../models/Product");

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

exports.cart_addItem_post = async (req, res) => {
    const { productId, quantity, name, price } = req.body;
    
    const userId = "63541db8b75e63463d5178b2"; //TODO: the logged in user id
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).json(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }]
        });
        
        return res.status(201).json(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };

const {Cart} = require("../models/Cart");
const {User} = require("../models/User");
const {Product} = require("../models/Product");

const moment = require('moment');

exports.cart_create_get = (req, res) => {
    // res.render();
    Product.find()
    .then((products) => {
    res.render("cart/add", {products});
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP POST for product

exports.cart_create_post = (req, res) => {
    console.log(req.body);
    // res.send("POST WORKS")
    // Saving the data into the database
    let cart = new Cart(req.body);
    cart.save()
    .then(() => {
        req.body.product.forEach(product => {
            Product.findById(product, (error, seller) => {
                seller.product.push(product);
                seller.save();
            })
        });
        res.redirect('/cart/index');
        // res.json({product})
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later");
    })
}

exports.cart_index_get = (req, res) => {
    Cart.find().populate('product')
    .then(cart => {
        res.render('cart/index', {cart, moment});  // products: products, moment: moment
        // res.json({products: products})
    })
    .catch((err) => {
        console.log(err);
    })
}

// Won't need to be used in React
exports.product_show_get  = (req, res) => {
    console.log(req.query.id);
    // Find ingredient by id
    // Product.findById(req.query.id).populate('recipe')
    Product.findById(req.query.id).populate('seller')
    .then(product => {
        res.render('product/detail', {product, moment});
    })
    .catch((err) => {
       console.log(err);
    })
}

exports.cart_delete_get = (req, res) => {
    console.log(req.query.id);

    Product.findByIdAndDelete(req.query.id)
    // .then((product) => {}) for React
    .then(() => {
        res.redirect(('/product/index'));
        // res.json({product})
    })
    .catch((err) => {
        console.log(err);
    })
}


exports.product_edit_get = (req, res) => {
    Product.findById(req.query.id)
    .then((product) => {
        res.render('product/edit', {product});
        // res.json({product})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.product_update_put = (req, res) => {
    console.log(req.body.id);
    // console.log(req.body._id);
    Product.findByIdAndUpdate(req.body.id, req.body, {new: true})
    // Product.findByIdAndUpdate(req.body._id, req.body, {new: true})
    // .then((product) => {}) for React
    .then(() => {
        res.redirect('/product/index');
        // res.json({product})
    })
    .catch((err) => {
        console.log(err);
    })
}
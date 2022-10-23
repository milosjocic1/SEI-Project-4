const {Seller} = require('../models/Seller');
const {Favourite} = require('../models/Favourite');
const {Product} = require('../models/Product');


const moment = require('moment');

exports.product_create_get = (req, res) => {
    // res.render();
    Seller.find()
    .then((sellers) => {
    res.render("product/add", {sellers});
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP POST for product

exports.product_create_post = (req, res) => {
    console.log(req.body);
    // res.send("POST WORKS")
    // Saving the data into the database
    let product = new Product(req.body);
    product.save()
    .then(() => {
        req.body.seller.forEach(seller => {
            Seller.findById(seller, (error, seller) => {
                seller.product.push(product);
                seller.save();
            })
        });
        // res.redirect('/product/index');
        res.json({product})
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later");
    })
}

exports.product_index_get = (req, res) => {
    Product.find().populate('seller')
    .then(products => {
        // res.render('product/index', {products, moment});  // products: products, moment: moment
        res.json({products: products})
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
        // res.json({product})
    })
    .catch((err) => {
       console.log(err);
    })
}

exports.product_delete_get = (req, res) => {
    console.log(req.query.id);

    Product.findByIdAndDelete(req.query.id)
    // .then((product) => {}) for React
    .then((product) => {
        // res.redirect(('/product/index'));
        res.json({product})
    })
    .catch((err) => {
        console.log(err);
    })
}


exports.product_edit_get = (req, res) => {
    Product.findById(req.query.id)
    .then((product) => {
        // res.render('product/edit', {product});
        res.json({product})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.product_update_put = (req, res) => {
    console.log(req.body.id);
    // console.log(req.body._id);
    // Product.findByIdAndUpdate(req.body.id, req.body, {new: true})
    Product.findByIdAndUpdate(req.body._id, req.body, {new: true})
    // .then((product) => {}) for React
    .then((product) => {
        // res.redirect('/product/index');
        res.json({product})
    })
    .catch((err) => {
        console.log(err);
    })
}
const { Review } = require("../models/Review");
const { Seller } = require("../models/Seller");
const { User } = require("../models/User");

const moment = require("moment");

exports.review_create_get = (req, res) => {
  Seller.find()
    .then((sellers) => {
      res.render("review/add", { sellers });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.review_create_post = (req, res) => {
  console.log(req.body);
  // res.send("POST WORKS")
  // Saving the data into the database
  let review = new Review(req.body);
  review
    .save()
    .then(() => {
      // req.body.seller.forEach(seller => {
      let seller = review.seller;
      Seller.findById(seller, (error, seller) => {
        seller.review.push(review.id);
        seller.save();
      });
      // });
      // res.redirect('/product/index');
      res.json({ review });
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later");
    });
};

exports.review_delete_get = (req, res) => {
  console.log(req.query.id);
  Review.findById(req.query.id)
    // .then((product) => {}) for React
    .then((review) => {
      // res.redirect(('/product/index'));
      // res.json({product})
      console.log(review);
      Seller.findById(review.seller, (error, seller) => {
        console.log(seller);
        seller.review.remove(req.query.id);
        seller.save();
        Review.findByIdAndDelete(req.query.id)
          // .then((product) => {}) for React
          .then((review) => {
            // res.redirect(('/product/index'));
            res.json({ review });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.review_edit_get = (req, res) => {
    Review.findById(req.query.id)
    .then((review) => {
      // res.render('product/edit', {product});
      res.json({ review });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.review_update_put = (req, res) => {
    console.log(req.body.id);
    console.log(req.body._id);
    // Product.findByIdAndUpdate(req.body.id, req.body, {new: true})
    Review.findByIdAndUpdate(req.body._id, req.body, { new: true })
      // .then((product) => {}) for React
      .then((review) => {
        res.json({ review });
      })
      .catch((err) => {
        console.log(err);
      });
  };

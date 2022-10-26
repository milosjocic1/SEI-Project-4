const express = require("express");

const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'));

router.use(express.urlencoded({ extended: true })); // EE unhashing for testing
router.use(express.json());
const cartCtrl = require("../controllers/cart");

// router.get('/cart/add', cartCtrl.cart_create_get);
// router.post('/cart/add', cartCtrl.cart_create_post);
// router.get('/cart/index', cartCtrl.cart_index_get);
router.post('/cart', cartCtrl.addItemToCart);
router.get('/cart', cartCtrl.getCart);
// router.patch('/cart', cartCtrl.decreaseQuantity);
router.delete('/cart', cartCtrl.removeItem);
// router.post('/cart/add', cartCtrl.cart_addItem_post);
// router.get('/cart/detail', cartCtrl.cart_show_get);
// router.get('/cart/delete', cartCtrl.cart_delete_get);
// router.get('/cart/edit', cartCtrl.cart_edit_get);
// router.put('/cart/update', cartCtrl.cart_update_put);

module.exports = router;
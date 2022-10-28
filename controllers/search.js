const { Product } = require("../models/Product");

// exports.search_post = (req, res) => {
//     let searched = req.query.item;
//     // searched = searched.toLowerCase()
//     console.log(searched);


  
//     Product.find({product.title: { $regex: product.searched }})
//       .then((products) => {
//         res.json({products: products})
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
  
exports.search_post = (req, res) => {
    let searched = req.query.title
    Product.find()
    .then((products) => {
        const filters = req.query;
        const filteredProducts = products.filter((product) => {
            let isValid = true 
            for (key in filters) {
                console.log(key, product[key], filters[key]);
                isValid = isValid && product[key] == filters[key];
              }
              return isValid;
        })

    res.json(filteredProducts)
})
.catch(error => {
    console.log(error)
})
}
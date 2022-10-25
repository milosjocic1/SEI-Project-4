const {User} = require("../models/User")
const {Seller} = require("../models/Seller")
const {Review} = require("../models/Review")
const {Transaction} = require("../models/Transaction")

// __________________________________ SELLER DASHBOARD GET  __________________________________ //

exports.seller_dashboard_get = async (req, res) => {

    let user = await User.findById(req.query.userId)
    .populate("favourite", "review") // NEEDS TO BE UPDATED WHEN SIGNIN IS WORKING ON FE
    let seller = ""
    seller = await Seller.find({user: {$in: [user._id]}}).populate("product", "review")
            .then(seller => {
                seller = seller[0]
                return seller
            })
    try{
            res.status(200).json({user, seller})
        }
    catch(error){
        console.log(error)
    }
}



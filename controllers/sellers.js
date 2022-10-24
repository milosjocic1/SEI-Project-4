const {User} = require("../models/User")
const {Seller} = require("../models/Seller")
const {Review} = require("../models/Review")
const {Transaction} = require("../models/Transaction")

// __________________________________ SELLER DASHBOARD GET  __________________________________ //

exports.seller_dashboard_get = async (req, res) => {

    let user = await User.findById("63541db8b75e63463d5178b2")
    .populate("favourite", "review") // NEEDS TO BE UPDATED WHEN SIGNIN IS WORKING ON FE
    let seller = ""
    try{
            seller = Seller.find({user: {$in: [user._id]}}).populate("product", "review")
            .then(seller => {
                seller = seller[0]
                return seller
            })
            res.status(200).json({user, seller})
        }
    catch(error){
        console.log(error)
    }
}



const {User} = require("../models/User")
const {Favourite} = require("../models/Favourite")
const {Review} = require("../models/Review")

// __________________________________ USER DASHBOARD GET  __________________________________ //

exports.user_dashboard_get = async (req, res) => {
  
    let user = await User.findById(req.query.userId)
    .populate("favourite review")
    try {
        res.status(200).json({user})
        }
    catch(error){
        console.log(error)
     }
}



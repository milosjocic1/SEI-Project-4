const {User} = require("../models/User")
const {Favourite} = require("../models/Favourite")
const {Review} = require("../models/Review")


// __________________________________ USER DASHBOARD GET  __________________________________ //

exports.user_dashboard_get = async (req, res) => {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    user = decodedToken.user;
    let user = await User.findById({user._u})}
    .populate("favourite review")
    try {
        res.status(200).json({user})
        }
    catch(error){
        console.log(error)
     }
}




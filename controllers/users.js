const {User} = require("../models/User")
const {Favourite} = require("../models/Favourite")
const {Review} = require("../models/Review")
const jwt = require('jsonwebtoken');
require("dotenv").config;

// __________________________________ USER DASHBOARD GET  __________________________________ //

exports.user_dashboard_get = async (req, res) => {
  
    let user = await User.findById("63541db8b75e63463d5178b2")
    .populate("favourite review")
    try {
        res.status(200).json({user})
        }
    catch(error){
        console.log(error)
     }
}




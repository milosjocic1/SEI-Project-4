const {User} = require("../models/User")
const {Favourite} = require("../models/Favourite")
const {Review} = require("../models/Review")
const {Transaction} = require("../models/Transaction")

// __________________________________ USER DASHBOARD GET  __________________________________ //

exports.user_dashboard_get = (req, res) => {
    User.findById("63541bfb85ffc46174c1ac43")
    .populate("favourite review transaction")
    .then((user) =>
    res.json({user}))
    .catch((err) => {
        console.log(err)
    })
}

exports.user_profile_get = (req, res) => {
    //

}

exports.user_profile_update_put = (req, res) => {
    //
}

exports.user_profile_delete_get = (req, res) => {
    //
}


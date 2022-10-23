const {User} = require("../models/User")

// __________________________________ USER DASHBOARD GET  __________________________________ //

exports.user_dashboard_get = (req, res) => {
    res.render("user/dashboard")
}
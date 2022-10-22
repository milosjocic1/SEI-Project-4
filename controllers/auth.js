const {User} = require("../models/User")
const {Seller} = require("../models/Seller")

//  will need to require passport configuration 
let passport = require('../helper/ppConfig');

//  Require bcrypt for hashing
const bcrypt = require ('bcrypt');
// const {Next} = require("react-bootstrap/esm/PageItem");
// 10 rounds of hashing
const salt = 10 

exports.auth_signup_get = (req, res) => {
    res.render("auth/signup")
}

exports.auth_signup_post = async (req,res) =>{
    let emailAddress = req.body.emailAddress;

    try{

        let match = await User.findOne({"emailAddress": emailAddress})
        console.log(match);
        if(!match) {
        
            let user = new User(req.body)
            image = req.file.filename

            let hash = bcrypt.hashSync(req.body.password, salt);
            console.log(hash)
            user.password = hash;
            user.save()
            .then(() => {
                User.findById(user)
                .then((user) =>{ 
                    if(user.userRole === "seller"){
                    let seller = new Seller(req.body)
                    seller.user.push(user)
                    console.log(seller.user[0]._id)
                    seller.save()
                    }
                })
                res.redirect("/")
                res.json({"message": "User created successfully"})
            })
            .catch((err)=> {
                console.log(err);
                res.send("Please try again later.")
            })

        }
        if(match){
            req.flash('error', 'You already have an account, please sign-in');
            res.redirect('/auth/signin')
        }
    }
    catch(error){
        console.log(error)
    }
}

exports.auth_signin_get =  (req, res) => {
    res.render("auth/signin");
  }

// HTTP POST Signin Route
exports.auth_signin_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/"
})  

exports.auth_logout_get = (req, res) => {
    req.logout(function(err) {
        if(err) {
            req.flash('error', 'You have not logged out successfully');
            return Next(err);
        }
        req.flash('success', 'You are logged out successfully');
        res.redirect('/auth/signin')
    })
}
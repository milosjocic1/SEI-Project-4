const {User} = require("../models/User")
const {Seller} = require("../models/Seller")

//Require jsonwebtoken 
const jwt = require("jsonwebtoken")

//  will need to require passport configuration 
let passport = require('../helper/ppConfig');

//  Require bcrypt for hashing
const bcrypt = require ('bcrypt');
const { json } = require("body-parser");

// 10 rounds of hashing
const salt = 10 

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// __________________________________ AUTH SIGNUP GET __________________________________ //
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup")
}

// __________________________________ AUTH SIGNUP POST __________________________________ //

exports.auth_signup_post = async (req,res) =>{
    let emailAddress = req.body.emailAddress;

    try{

        let match = await User.findOne({emailAddress})
        console.log(match);
        if(!match) {
        
            // image = req.file.filename
            const result = await cloudinary.uploader.upload(req.file.path);

            let hash = await bcrypt.hashSync(req.body.password, salt);
            console.log(hash)

            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                password: req.body.password,
                cloudinary_id: result.public_id
            })
            console.log(user.userRole)
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
                // res.redirect("/")
                res.json({"message": "User created successfully"})
            })
            .catch((err)=> {
                console.log(err);
                // res.send("Please try again later.")
                res.json({"message": "please try again later"})
            })

        }
        if(match){
            // req.flash('error', 'You already have an account, please sign-in');
            // res.redirect('/auth/signin')
            res.json({"message": "you already have an account, please sign-in"})
        }
    }
    catch(error){
        console.log(error)
    }
}

// __________________________________ AUTH SIGNIN GET __________________________________ //

exports.auth_signin_get =  (req, res) => {
    res.render("auth/signin");
  }

// HTTP POST Signin Route
// exports.auth_signin_post = passport.authenticate('local', {
//     successRedirect: "/",
//     failureRedirect: "/auth/signin"
// })  

// __________________________________ AUTH SIGNUP POST __________________________________ //

exports.auth_signin_post = async(req, res) => {
    let {emailAddress, password} = req.body;
    console.log(emailAddress)

    try{
        let user = await User.findOne({emailAddress});
        console.log(user);

        if(!user){
            return res.json({"message": "User not found"}).status(400)
        }
        // password comparision
        const isMatch = await bcrypt.compareSync(password, user.password);
        console.log(password); //Plain text password
        console.log(user.password); // Encrypted password from DB

        if(!isMatch){
            return res.json({"message": "Password not matched"}).status(400)
        }

        // JWT token
        const payload = {
            user: {
                id: user._id,

            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 3600000000000},
            (err, token) => {
                if(err) throw err;
                res.json({token}).status(200)
            }
        )
    }
    catch(error){
        console.log(error);
        res.json({"message": "You are not logged in"}).status(400);
    }
}

// __________________________________ AUTH LOGOUT GET __________________________________ //

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

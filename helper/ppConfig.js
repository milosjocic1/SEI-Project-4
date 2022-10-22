// This file acts as a middleware

// require passport
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
// Require user model
const {User} = require('../models/User');
// Serialise user
// save data into session
// unique identifier
passport.serializeUser(function(user, done){
    done(null, user.id)
});

// deserialise user
// reading info from the database according to id from session
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        done(err,user);
    });
});

passport.use(new LocalStrategy({
    usernameField: "emailAddress",
    passwordField: "password",
},

    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


// Export passport middleware
module.exports = passport;
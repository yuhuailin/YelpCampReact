var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

// root route
router.get("/", function(req, res) {
   res.render("landing"); 
});


// =================
// AUTH ROUTES
// =================

// show sign up form
router.get("/register", function(req, res) {
   res.render("register", {page:'register'}); 
});

// handle user sign up
router.post("/register", function(req, res) {
    // create a new user, hash the password and store into database
    var newUser = new User(
        {
            username: req.body.username, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar
        });
    if(req.body.adminCode === "SecretCode123") {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            // req.flash("error", err.message);
            // return res.redirect("/register");
            return res.render("register", {error: err.message});
        } 
        // log user in, take care of session, run serializeUser method, specify to use "local" strategy
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// =================
// LOGIN ROUTES
// =================

// render login form
router.get("/login", function(req, res) {
    res.render("login", {page:'login'}); 
});

// handle user login
// authenticate is middleware, run before callback
router.post("/login", passport.authenticate("local", {
            successRedirect: "/campgrounds",
            failureRedirect: "/login",
            failureFlash: true
        }) , function(req, res) {
});

// =================
// LOGOUT ROUTES
// =================
router.get("/logout", function(req,res) {
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/campgrounds");
});

// =================
// profile route
// =================
router.get("/users/:user_id", function(req, res) {
    User.findById(req.params.user_id, function(err, foundUser) {
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("/");
        } else {
            Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
                if(err) {
                    req.flash("error", "Something went wrong");
                    res.redirect("/");
                } 
                res.render("users/show", {user: foundUser, campgrounds: campgrounds});
            })
        }   
    });
});

module.exports = router;
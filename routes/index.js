var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

// =================
// AUTH ROUTES
// =================
// handle user sign up
router.post("/api/register", function(req, res) {
  // create a new user, hash the password and store into database
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    avatar: req.body.avatar
  });
  if (req.body.adminCode === "SecretCode123") {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    }
    // log user in, take care of session, run serializeUser method, specify to use "local" strategy
    passport.authenticate("local")(req, res, function() {
      return res.send(req.user);
    });
  });
});

// =================
// LOGIN ROUTES
// =================
// handle user login
// authenticate is middleware, run before callback

router.post('/api/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
        return res.status(401).send({msg:"Wrong Username or Password", className: "alert-danger"});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(req.user);
    });
  })(req, res, next);
});

// =================
// LOGOUT ROUTES
// =================
router.get("/api/logout", function(req, res) {
  req.logout();
  res.send(req.user);
});

// =================
// profile route
// =================

router.get("/api/users/:id", async (req, res) => {
  // find the campground with provided id
  var user = await User.findById(req.params.id);
  const campgrounds = await Campground.find()
    .where("author.id")
    .equals(user._id);
  user = user.toObject();
  user.campgrounds = campgrounds;
  res.send(user);
});

module.exports = router;

var express = require("express");
// add all routes to router rather than app itself
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder   = require("geocoder");

// INDEX route
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds:allCampgrounds, page: 'campgrounds'});
       }
    });
});

// CREATE route
router.post("/",middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        if(err){
                console.log(err);
        } else {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            var newCampground = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
            // Create a new campground and save to DB
            Campground.create(newCampground, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to campgrounds page
                    console.log(newlyCreated);
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

// NEW - show form to create a new campground
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


// SHOW
router.get("/:id", function(req, res){
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground:foundCampground});   
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    //req.body.campground.description = req.sanitize(req.body.campground.description);
    geocoder.geocode(req.body.campground.location, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            req.body.campground.lat = data.results[0].geometry.location.lat;
            req.body.campground.lng = data.results[0].geometry.location.lng;
            req.body.campground.location = data.results[0].formatted_address;
            Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
                if(err){
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    req.flash("success","Successfully Updated!");
                    res.redirect("/campgrounds/" + updatedCampground._id);
                }
            });
        }
    });
});

// DESTROY ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");    
        }
    });
});

module.exports = router;
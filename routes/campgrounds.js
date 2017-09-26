var express = require("express");
// add all routes to router rather than app itself
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var geocoder = require("geocoder");

router.get("/api/campgrounds/all", async (req, res) => {
  console.log("retrieve all campgrounds");
  const campgrounds = await Campground.find();
  res.send(campgrounds);
});

router.get("/api/campgrounds", async (req, res) => {
  console.log("search specific campgrounds");
  const regex = new RegExp(escapeRegex(req.query.search), "gi");
  const campgrounds = await Campground.find({ name: regex });
  res.send(campgrounds);
});

router.get("/api/campgroundsIndex", async (req, res) => {
  console.log("search specific campgrounds index");
  const campgrounds = await Campground.find({
    $text: { $search: req.query.search }
  });
  res.send(campgrounds);
});

// CREATE route
router.post("/api/campgrounds", middleware.isLoggedIn, function(req, res) {
  console.log("create a new campgrounds");
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  geocoder.geocode(req.body.location, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var newCampground = {
        name: name,
        image: image,
        description: desc,
        price: price,
        author: author,
        location: location,
        lat: lat,
        lng: lng
      };
      // Create a new campground and save to DB
      Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
          console.log(err);
        } else {
          Campground.find({}, function(err, campgrounds) {
            if (err) {
              console.log(err);
            } else {
              res.send(campgrounds);
            }
          });
        }
      });
    }
  });
});

// SHOW
router.get("/api/campgrounds/:id", async (req, res) => {
  console.log("show a campground");
  var campground = await Campground.findById(req.params.id).populate(
    "comments"
  );
  res.send(campground);
});

// // UPDATE CAMPGROUND ROUTE
router.put(
  "/api/campgrounds/:id",
  middleware.checkCampgroundOwnership,
  async (req, res) => {
    console.log("update campground");
    await geocoder.geocode(req.body.campground.location, async (err, data) => {
      req.body.campground.lat = data.results[0].geometry.location.lat;
      req.body.campground.lng = data.results[0].geometry.location.lng;
      req.body.campground.location = data.results[0].formatted_address;
      const updatedCampground = await Campground.findByIdAndUpdate(
        req.params.id,
        req.body.campground
      ).populate("comments");
      res.send(updatedCampground);
    });
  }
);

// DESTROY ROUTE
router.delete(
  "/api/campgrounds/:id",
  middleware.checkCampgroundOwnership,
  async (req, res) => {
    console.log("delete campground");
    const campground = await Campground.findById(req.params.id);
    for (var i = 0; i < campground.comments.length; i++) {
      await Comment.findByIdAndRemove(campground.comments[i]);
    }
    await Campground.findByIdAndRemove(req.params.id);
    const campgrounds = await Campground.find();
    res.send(campgrounds);
  }
);

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;

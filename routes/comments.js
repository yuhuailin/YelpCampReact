var express = require("express");
// merge params from compgrounds and comments together
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ====================
// COMMENT ROUTES
// ====================

// CREATE route - create comments
router.post(
  "/api/campgrounds/:id/comments/new",
  middleware.isLoggedIn,
  async (req, res) => {
    // find campground
    const campground = await Campground.findById(req.params.id);
    const comment = await Comment.create(req.body);
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    // save comment
    await comment.save();
    await campground.comments.push(comment);
    await campground.save();
    const campgroundNew = await Campground.findById(req.params.id).populate(
      "comments"
    );
    res.send(campgroundNew);
  }
);

// COMMENT UPDATE
router.put(
  "/api/campgrounds/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  async (req, res) => {
    var comment = await Comment.findByIdAndUpdate(
      { _id: req.params.comment_id },
      { $set: { text: req.body.text } },
      { new: true }
    );
    const campgroundNew = await Campground.findById(req.params.id).populate(
      "comments"
    );
    res.send(campgroundNew);
  }
);

// DESTROY ROUTE
router.delete(
  "/api/campgrounds/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  async (req, res) => {
    await Comment.findByIdAndRemove(req.params.comment_id);
    var campground = await Campground.findById(req.params.id);
    var index = campground.comments.indexOf(req.params.comment_id);
    campground.comments.splice(index, 1);
    await campground.save();
    const campgroundNew = await Campground.findById(req.params.id).populate(
      "comments"
    );
    res.send(campgroundNew);
  }
);

module.exports = router;

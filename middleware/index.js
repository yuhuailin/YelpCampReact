var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
               console.log(err);
            } else {
                // does user own the campground?
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    res.status(403).send({msg: "Forbbiden!", className: "alert-danger"});
                }
            }
        });
    } else {
        res.status(401).send({msg: "You Must Log In!", className: "alert-danger"});
    }
}


middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               console.log(err);
           }  else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                  res.status(403).send({msg: "Forbbiden!", className: "alert-danger"});
                }
            }
        });
    } else {
      res.status(401).send({msg: "You Must Log In!", className: "alert-danger"});
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).send({msg: "You Must Log In!", className: "alert-danger"});
};

module.exports = middlewareObj;

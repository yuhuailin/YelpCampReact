var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name:"A site",
            image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf",
            description: "blah blah blah"
        },
        {
            name:"B site",
            image: "http://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg",
            description: "blah blah blah"
        },
        {
            name:"C site",
            image: "http://www.destination360.com/north-america/us/utah/salt-lake-city/images/s/camping.jpg",
            description: "blah blah blah"
        }
    ]

function seedDB() {
    // removed all campgrounds
    Campground.remove({}, function(err) {
       if (err) {
           console.log(err);
       } 
       console.log("removed campgrounds!");
       // add a few campgrounds
        data.forEach(function(seed){
           Campground.create(seed, function(err, campground) {
             if(err) {
                 console.log(err);
             } else {
                 console.log("added a campground!");
                 // add a few comments
                //  Comment.create(
                //      {
                //          text: "this is a good place for camping.",
                //          author: "YL"
                //      }, function(err, comment) {
                //          if (err) {
                //              console.log(err);
                //          } else {
                //             campground.comments.push(comment);
                //             campground.save();
                //             console.log("created a new comment");
                //          }
                //      });
             }
           });
        });
    });
}

module.exports = seedDB;
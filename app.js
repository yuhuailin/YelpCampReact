var express         = require("express"),
    app             = express(),
    // for urls in form
    bodyParser      = require("body-parser"),
    // for database
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),

    // self defined module
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    keys            = require("./config/keys");

// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// connect mongoose to db
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {useMongoClient: true});
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.locals.moment = require('moment');
// passport config
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// for reading the session, encode/decode the data in session
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware: add req.user to every routes
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  // like out main.js file or main.css file
  app.use(express.static("client/build"));
  // express will serve up index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
   console.log("The YelpCamp Server Has Started!");
});

// RESTFUL routes
// name       url              method    desc
// ======================================================================
// Index      /dogs            GET       Display of a list of all dogs
// New        /dogs/new        GET       Display of a form to make a new dog
// Create     /dogs            POST      Add a new dog to DB
// Show       /dogs/:id        GET       Shows info about one dog
// Edit       /dogs/:id/edit   GET       Shows edit form for one dog
// Update     /dogs/:id        PUT       Update edit and redirect
// Destroy    /dogs/:id        DELETE    Delete dog and redirect



// REST - a mapping between HTTP routes and CRUD
// CRUD: Create, Read, Update, Destroy
// BLOG

// Create:
// Read: /allBlogs
// Update: /updateBlog/:id
// Destroy: /destroyBlog/:id

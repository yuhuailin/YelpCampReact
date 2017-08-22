var express         = require("express"),
    app             = express(),
    // for urls in form
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    // for database
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    
    // self defined module
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
// connect mongoose to db
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
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

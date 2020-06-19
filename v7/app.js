var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user")
    seedDB      = require("./seeds")

var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index")


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
seedDB();

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872_1280.jpg"},
    {name: "Grantie Hill", image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_1280.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"}
]







app.listen(3000, function(){
    console.log("The YelpCamp server has started!!!")
});
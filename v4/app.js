var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")



mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// Campground.create(    
//     {name: "Grantie Hill",
//     image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_1280.jpg",
//     description: "This is a huge grantie hill, no bathrooms. No water. Beautiful grantie!"
//     },function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND!");
//         console.log(campground);
//     }
// });

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872_1280.jpg"},
    {name: "Grantie Hill", image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_1280.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"}
]

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});   
        }
    })
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name; 
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
               res.render("campgrounds/show", {campground:foundCampground});
        }
    })
});


app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});        
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!!!")
});
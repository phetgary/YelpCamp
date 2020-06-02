var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872_1280.jpg"},
    {name: "Grantie Hill", image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_1280.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_1280.jpg"}
]

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name; 
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!!!")
});
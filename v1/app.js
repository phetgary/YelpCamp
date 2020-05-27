var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440752a7cd0954bc2_340.jpg"},
        {name: "Grantie Hill", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507440752a7cd0954bc2_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440752a73d3924cc0_340.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function(){
    console.log("The YelpCamp server has started!!!")
});
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   name: "迷霧公園",
        image:"https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg",
        description:"blah blah blah"
},
    {   name: "大溪地森林",
        image:"https://cdn.pixabay.com/photo/2020/01/11/07/39/north-4756774_1280.jpg",
        description:"blah blah blah"
},
    {   name: "阿里山鐵軌",
        image:"https://cdn.pixabay.com/photo/2017/04/05/01/11/bridge-2203661_1280.jpg",
        description:"blah blah blah"
}
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed the campground!");
        }

        data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground!");
                    Comment.create({
                        text: "這個地方很棒，但我希望這裡有網路",
                        author: "Gary"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment")
                        }  
                    });
                }
            });
        })
    });
}

module.exports = seedDB;

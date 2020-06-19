var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {   name: "迷霧公園",
        image:"https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg",
        description:"低調，是他的代名詞，他鮮少應酬、下班後深居簡出。4年前，翁英暉資助台大電機系團隊超過100萬美元，唯一條件是：「不能把我的名字說出去。」這位堪稱「台灣科技界最神秘的董事長」，甚至創業20年從不跟媒體打交道，直到去年因回任執行長、帶領公司轉型，才願意曝光。"
},
    {   name: "大溪地森林",
        image:"https://cdn.pixabay.com/photo/2020/01/11/07/39/north-4756774_1280.jpg",
        description:"低調，是他的代名詞，他鮮少應酬、下班後深居簡出。4年前，翁英暉資助台大電機系團隊超過100萬美元，唯一條件是：「不能把我的名字說出去。」這位堪稱「台灣科技界最神秘的董事長」，甚至創業20年從不跟媒體打交道，直到去年因回任執行長、帶領公司轉型，才願意曝光。"
},
    {   name: "阿里山鐵軌",
        image:"https://cdn.pixabay.com/photo/2017/04/05/01/11/bridge-2203661_1280.jpg",
        description:"低調，是他的代名詞，他鮮少應酬、下班後深居簡出。4年前，翁英暉資助台大電機系團隊超過100萬美元，唯一條件是：「不能把我的名字說出去。」這位堪稱「台灣科技界最神秘的董事長」，甚至創業20年從不跟媒體打交道，直到去年因回任執行長、帶領公司轉型，才願意曝光。"
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

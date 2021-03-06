var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCapmgorundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "CAMPGROUND NOT FOUND");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next()
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "您必須先登入會員!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwenership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                } else {
                    req.flash("error", "您必須先登入會員!");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "您必須先登入會員!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "您必須先登入會員!");
    res.redirect("/login");
}


module.exports= middlewareObj
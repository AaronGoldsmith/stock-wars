// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var express = require("express");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    
    res.render("index")
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    
    if (req.user) {
      res.redirect("members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/dashboard", function (req, res) {
    if (req.user) {
      res.redirect("members");
    }

    res.render("dashboard", {
      msg: "Welcome back, Name!"
    });
  })
  app.get("*",function(req,res){
    res.render("404",{
      msg: "Page doesn't not exist",
      error: "404"
    });
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
  });

  app.get("/transaction", isAuthenticated, function(req, res) {
    res.render("transaction");
  });

};

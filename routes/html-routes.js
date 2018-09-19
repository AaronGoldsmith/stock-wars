// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var express = require("express");
var db = require("../models/index");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      console.log('signed in');

      res.render("dashboard", {
        msg: "Welcome",
        name: req.user.firstName,
        total: req.user.initialCash,
        available: req.user.activeCash,
        user: req.user,
      });
    }
    else{
      console.log('index');
      res.render("index")
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    
    // res.render("index")
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    
    if (req.user) {
      res.redirect("members.html");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
  })

  // app.get("/dashboard", isAuthenticated, function (req, res) {
  //     res.render("dashboard", {
  //       msg: "Welcome back, Name!"
  //     })
  //   })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
  });

  app.get("/transaction", isAuthenticated, function(req, res) {
    res.render("transaction");
  });


  app.get("/stock", function(req, res) {
    if (req.user) {
      console.log('signed in');

      res.render("stock", {
        user: req.user,
        name: req.user.firstName
      });
    }
    //   res.render("stock", req.query)
  })

  app.get("/dashboard", function(req, res) {
    if (req.user) {
      console.log('signed in');

      res.render("dashboard", {
        msg: "Welcome",
        name: req.user.firstName,
        total: req.user.initialCash,
        available: req.user.activeCash,
        user: req.user
      });
    }
  })

  app.get("/*",function(req,res){
    res.render("404",{
      msg: "Page doesn't not exist",
      error: "404"
    });
  })

};
